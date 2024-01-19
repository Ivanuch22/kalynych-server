const ApiError = require("../error/AppiError");
const { User, Learner, Expert } = require("../models/models");

class ExpertController {
    async create(req, res, next) {
        const {
            field,
            category,
            bio,
            link_of_media,
            aditional_service,
            meetings,
            workshops
        } = req.body;

        const { id } = req.user;
        let current_role = "EXPERT";

        const user = await User.findOne({ where: { id: id } });

        if (!user) return next(ApiError.badRequest(`User not define`));

        await user.update({ expert_for_in_key: true, current_role })

        const candidate = await Expert.findOne({ where: { userId: id } });

        if (candidate) return next(ApiError.badRequest(`Expert is already have `));

        try {
            const expert = await Expert.create({
                userId: id,
                field,
                category,
                bio,
                link_of_media,
                aditional_service,
                meetings,
                workshops
            })
            return res.json({ status: 200, expert });

        } catch (e) {
            return next(ApiError.badRequest(`Incorrect email or password ${e}`));
        }
    }



    async update(req, res, next) {
        const { purpose, way_for_learning, goals, topics } = req.body;
        const { id, current_role } = req.user;

        if (current_role !== "EXPERT") return next(ApiError.badRequest("Incorrect current_role"));

        try {
            const expertUpdateObject = {};

            if (purpose) expertUpdateObject.purpose = purpose;
            if (topics) expertUpdateObject.topics = topics;
            if (way_for_learning) expertUpdateObject.way_for_learning = way_for_learning;
            if (goals) expertUpdateObject.goals = goals;

            if (Object.keys(expertUpdateObject).length > !0) return next(ApiError.badRequest("No fields to update"));

            const [rowsUpdatedLearner, [learnerAfterUpdate]] = await Learner.update(
                expertUpdateObject,
                { returning: true, where: { userId: id } }
            );

            if (!learnerAfterUpdate) return next(ApiError.badRequest("No fields to update"));

            res.json({ status: 200, message: "Learner Updated", learner: learnerAfterUpdate });

        } catch (error) {
            return next(ApiError.internalServerError("Error updating learner"));
        }
    }
}

module.exports = new ExpertController();
