const templates = require('@indiekit/templates-yaml');

/**
 * Default publication configuration.
 *
 * @exports default
 * @note Values required for all properties (empty or not) to ensure user
 * configured values overwrite defaults.
 */
module.exports = {
  categories: [],
  'post-types': {
    article: {
      name: 'Article',
      icon: ':page_facing_up:',
      template: `${templates}/article.njk`,
      post: {
        path: '_posts/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: '{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      },
      media: {
        path: 'media/{{ filedate | date(\'yyyy/MM/dd\') }}/{{ filename }}'
      }
    },
    note: {
      type: 'note',
      name: 'Note',
      icon: ':notebook_with_decorative_cover:',
      template: `${templates}/note.njk`,
      post: {
        path: '_notes/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'notes/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    photo: {
      name: 'Photo',
      icon: ':camera:',
      template: `${templates}/photo.njk`,
      post: {
        path: '_photos/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'photos/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      },
      media: {
        path: 'media/photos/{{ filedate | date(\'yyyy/MM/dd\') }}/{{ filename }}'
      }
    },
    video: {
      name: 'Video',
      icon: ':video_camera:',
      template: `${templates}/video.njk`,
      post: {
        path: '_videos/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'videos/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      },
      media: {
        path: 'media/videos/{{ filedate | date(\'yyyy/MM/dd\') }}/{{ filename }}'
      }
    },
    audio: {
      name: 'Audio',
      icon: ':microphone:',
      template: `${templates}/audio.njk`,
      post: {
        path: '_audio/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'audio/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      },
      media: {
        path: 'media/audio/{{ filedate | date(\'yyyy/MM/dd\') }}/{{ filename }}'
      }
    },
    bookmark: {
      name: 'Bookmark',
      icon: ':bookmark:',
      template: `${templates}/bookmark.njk`,
      post: {
        path: '_bookmarks/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'bookmarks/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    checkin: {
      name: 'Checkin',
      icon: ':triangular_flag_on_post:',
      template: `${templates}/checkin.njk`,
      post: {
        path: '_checkins/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'checkins/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    event: {
      name: 'Event',
      icon: ':calendar:',
      template: `${templates}/event.njk`,
      post: {
        path: '_events/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'events/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    rsvp: {
      name: 'Reply with RSVP',
      icon: ':speech_balloon:',
      template: `${templates}/reply.njk`,
      post: {
        path: '_replies/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'replies/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    reply: {
      name: 'Reply',
      icon: ':speech_balloon:',
      template: `${templates}/reply.njk`,
      post: {
        path: '_replies/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'replies/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    repost: {
      name: 'Repost',
      icon: ':recycle:',
      template: `${templates}/repost.njk`,
      post: {
        path: '_reposts/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'reposts/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    },
    like: {
      name: 'Like',
      icon: ':thumbsup:',
      template: `${templates}/like.njk`,
      post: {
        path: '_likes/{{ published | date(\'yyyy-MM-dd\') }}-{{ slug }}.md',
        url: 'likes/{{ published | date(\'yyyy/MM/dd\') }}/{{ slug }}'
      }
    }
  },
  'slug-separator': '-',
  'syndicate-to': []
};
