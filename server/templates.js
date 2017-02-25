module.exports = {
  'default' : {
    video: {
      dataTemplate: {
        'topic': {
          type: 'public-figure'
        },
        'summary': {
          type: 'public-figure'
        }
      },
      defaultValues: {
        'topic': '',
        'summary': ''
      }
    },
    section: {
      dataTemplate: {
        'speaker': {
          type: 'public-figure'
        },
        'summary': {
          type: 'public-figure'
        }
      },
      defaultValues: {
        'speaker': 'The Speaker',
        'summary': 'The Summary'
      }
    }
  }
};