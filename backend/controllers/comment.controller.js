const jwt = require('jsonwebtoken');
const db = require('../models');
const Post = db.Post;
const Comment = db.Comment;


exports.createComment = (req, res) => {

    const token = req.headers.authorization.split(' ')[1];
    const decodedToken = jwt.verify(token, process.env.JWT_SECRET_TOKEN);
    const userId = decodedToken.userId;

    Post.findOne({
        where: { id: req.params.postId }
    })
        .then(postFound => {
            if (postFound) {
                const comment = Comment.build({
                    content: req.body.content,
                    comment_userId: userId,
                    comment_postId: postFound.id
                })
                comment.save()
                    .then(() => {
                        const message = 'Votre commentaire a bien été publié !'
                        res.status(201).json({ message: message })
                    })
                    .catch(() => {
                        const message = "Une erreur s'est produite lors de la création de votre commentaire !"
                        res.status(400).json({ error: message })
                    })
            } else {
                const message = 'Publication non trouvé !'
                return res.status(404).json({ error: message })
            }
        })
        .catch(error => {
            const message = "Une erreur s'est produite !"
            res.status(500).json({ error: message })
        })

}

exports.getAllComments = (req, res, next) => {}

exports.deleteComments = (req, res, next) => {}
