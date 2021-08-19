class ArticleController {
  async index (req, res, next) {
    try {
      res.json([
        {
          title: 'Lorem 1',
          description: 'Lorem description 1'
        },
        {
          title: 'Lorem 2',
          description: 'Lorem description 2'
        },
        {
          title: 'Lorem 3',
          description: 'Lorem description 3'
        }
      ])
    } catch (e) {
      console.log(e)
    }
  }

  async store (req, res, next) {
    try {

    } catch (e) {
      console.log(e)
    }
  }

  async show (req, res, next) {
    try {

    } catch (e) {
      console.log(e)
    }
  }

  async update (req, res, next) {
    try {

    } catch (e) {
      console.log(e)
    }
  }

  async destroy (req, res, next) {
    try {

    } catch (e) {
      console.log(e)
    }
  }
}

module.exports = new ArticleController()
