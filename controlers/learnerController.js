const ApiError = require("../error/AppiError");
const { User, Learner } = require("../models/models");

class LearnerController {
    async create(req, res, next) {
        try {
            const { purpose, topics, way_for_learning, goals } = req.body;
            const { id } = req.user;
            let current_role = "LEARNER"

            const candidate = await Learner.findOne({ where: { userId: id } });
            const user = await User.findOne({ where: { id } });

            if (candidate) return next(ApiError.badRequest(`Learner is already have `));
            if (!user) return next(ApiError.badRequest(`User not define`));

            const learner = await Learner.create({
                userId: user.id,
                purpose,
                topics,
                way_for_learning,
                goals
            })

            await user.update({ learner_for_in_key: true, current_role })

            return res.json({ status: 200, learner });

        } catch (e) {
            return next(ApiError.badRequest(`Incorrect email or password ${e}`));
        }
    }


    async update(req, res, next) {
        const { purpose, way_for_learning, goals, topics } = req.body;
        const { id, current_role } = req.user;

        if (current_role === "LEARNER") return next(ApiError.badRequest("Incorrect current_role"));

        try {
            const learnerUpdateObject = {};
            if (purpose) learnerUpdateObject.purpose = purpose;
            if (topics) learnerUpdateObject.topics = topics;
            if (way_for_learning) learnerUpdateObject.way_for_learning = way_for_learning;
            if (goals) learnerUpdateObject.goals = goals;

            if (Object.keys(learnerUpdateObject).length > !0) return next(ApiError.badRequest("No fields to update"));

            const [rowsUpdatedLearner, [learnerAfterUpdate]] = await Learner.update(
                learnerUpdateObject,
                { returning: true, where: { userId: id } }
            );

            if (!learnerAfterUpdate) return next(ApiError.badRequest("No fields to update"));

            res.json({ status: 200, message: "Learner Updated", learner: learnerAfterUpdate });

        } catch (error) {
            console.error("Error updating learner:", error);
            return next(ApiError.internalServerError("Error updating learner"));
        }
    }
}

module.exports = new LearnerController();
