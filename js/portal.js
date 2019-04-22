// Build Content HTML
function builder(modules) {
  document.getElementById('content').innerHTML = '';
  document.getElementById('page').scrollTop = 0;
  var content = '';
  for(i = 0; i < modules.length; i++) {
    var topic = '';
    if((isCurrentOrArchived(modules[i]) != 'archived' && isHomeOrArchive() == 'Home') || (isCurrentOrArchived(modules[i]) == 'archived' && isHomeOrArchive() == 'Archive')) {
      for(j = 0; j < modules[i].topics.length; j++) {
        var navbuttons = '';
        var readsets = '';
        var readbuttons = '';
        if(modules[i].topics[j].hasOwnProperty('nav')) {
          for(k = 0; k < modules[i].topics[j].nav.length; k++) {
            navbuttons += '<a class="button" href="' + modules[i].topics[j].nav[k].href + '" target="_blank" rel="noopener" aria-label="';
            if(modules[i].topics[j].nav[k].hasOwnProperty('filetype')) navbuttons += modules[i].topics[j].nav[k].filetype + ' opens in new window"';
            else navbuttons += 'aria-label="Website opens in new window"';
            navbuttons += '>' + modules[i].topics[j].nav[k].label + '</a>';
          }
        }
        if(isCurrentOrArchived(modules[i]) == 'current') topic += '<div class="topic"><h2 class="title expand">' + modules[i].topics[j].title + '</h2><div class="nav">' + navbuttons + '</div></div>';
        else topic += '<div class="topic"><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="nav" style="display: none">' + navbuttons + '</div></div>';
      }
      content += '<div class="module"><div class="week"><div class="label">';
      if(modules[i].hasOwnProperty('label')) content += modules[i].label;
      else content += 'Week ' + String(i + 1);
      content += '</div><div class="date">' + modules[i].topics[0].date + '</div></div>' + topic + '</div>';
    }
  }
  if(content == '' && isHomeOrArchive() == 'Home') content += '<div class="module"><div class="topic"><h2>No current topics.</h2>' + '</div>';
  else if(content == '' && isHomeOrArchive() == 'Archive') content += '<div class="module"><div class="topic"><h2>No archived topics.</h2>' + '</div>';
  document.getElementById('content').innerHTML = content;
}

// Build Calendar HTML
function schedule(modules) {
  document.getElementById('calendar').innerHTML = '';
  currentDate = new Date();
  var calendar = '';
  for(i = 0; i < modules.length; i++) {
    var topics = '';
    var hasTopicWithDeliverable = false;
    for(j = 0; j < modules[i].topics.length; j++) {
      var deliverables = '';
      var hasDeliverable = false;
      if(modules[i].topics[j].hasOwnProperty('due')) {
        for(k = 0; k < modules[i].topics[j].due.length; k++) {
          if(modules[i].topics[j].due[k].hasOwnProperty('time')) {
            dueDate = new Date(Date.parse(modules[i].topics[j].date) + (modules[i].topics[j].due[k].deadline * 86400000) + (modules[i].topics[j].due[k].time.split(/[.]/)[0] * 3600000 + modules[i].topics[j].due[k].time.split(/[.]/)[1] * 60000));
          } else {
            dueDate = new Date(Date.parse(modules[i].topics[j].date) + (modules[i].topics[j].due[k].deadline * 86400000) + 86399999);
          }
          if(dueDate > currentDate && isHomeOrArchive() == 'Home') {
            deliverables += '<dd>' + modules[i].topics[j].due[k].deliverable + ' : ' + dueDate.toString().split(' ')[1] + ' ' + dueDate.toString().split(' ')[2] + ' @ ' + dueDate.toString().split(' ')[4].split(':')[0] + '.' + dueDate.toString().split(' ')[4].split(':')[1] +'</dd>';
            hasDeliverable = true;
            hasTopicWithDeliverable = true;
          } else if(dueDate < currentDate && isHomeOrArchive() == 'Archive') {
            deliverables += '<dd>' + modules[i].topics[j].due[k].deliverable + ' : ' + dueDate.toString().split(' ')[1] + ' ' + dueDate.toString().split(' ')[2] + ' @ ' + dueDate.toString().split(' ')[4].split(':')[0] + '.' + dueDate.toString().split(' ')[4].split(':')[1] +'</dd>';
            hasDeliverable = true;
            hasTopicWithDeliverable = true;
          }
        }
      }
      if(Boolean(hasDeliverable)) {
        topics += '<dt>' + modules[i].topics[j].title + '</dt>' + deliverables;
      }
    }
    if(Boolean(hasTopicWithDeliverable)) {
      calendar += '<h3 class="calendar">';
      if(modules[i].hasOwnProperty('label')) calendar += modules[i].label;
      else calendar += 'Week ' + String(i + 1);
      calendar += '</h3><dl>' + topics + '</dl>';
    }
  }
  if(calendar == '' && isHomeOrArchive() == 'Home') calendar = '<dl><dt>No future assignments.</dt></dl>';
  else if(calendar == '' && isHomeOrArchive() == 'Archive') calendar = '<dl><dt>No past assignments.</dt></dl>';
  document.getElementById('calendar').innerHTML = '<h2 class="calendar">Schedule</h2><div id="schedule" class="hide">' + calendar + '</div>';
}

// Test for current page
function isHomeOrArchive() {
  menuItem = document.getElementById('menu-links').getElementsByTagName('a');
  for(z = 0; z < menuItem.length; z++) {
    if(menuItem[z].className == 'menu-item current') return menuItem[z].textContent;
  }
}

// Test for module currency (return current for current, archived for archived, or nothing for future)
function isCurrentOrArchived(module) {
  for(r = 0; r < module.topics.length; r++) {
    topicDate = new Date(Date.parse(module.topics[r].date));
    currentDate = new Date();
    startDate = new Date(topicDate.valueOf() - (6 + topicDate.getDay()) * 86400000);
    endDate = new Date(topicDate.valueOf() + (7 - topicDate.getDay()) * 86400000);
    if(startDate < currentDate) {
      if(module.topics[r].hasOwnProperty('due')) {
        for(q = 0; q < module.topics[r].due.length; q++) {
          if(module.topics[r].due[q].hasOwnProperty('time')) {
            dueDate = new Date(Date.parse(module.topics[r].date) + (module.topics[r].due[q].deadline * 86400000) + (module.topics[r].due[q].time.split(/[.]/)[0] * 3600000 + module.topics[r].due[q].time.split(/[.]/)[1] * 60000));
          } else {
            dueDate = new Date(Date.parse(module.topics[r].date) + (module.topics[r].due[q].deadline * 86400000) + 86399999);
          }
          if(dueDate > currentDate) return 'current';
          else if(r == module.topics.length - 1 && q == module.topics[r].due.length - 1) return 'archived';
        }
      } else if(currentDate < endDate) return 'current';
        else return 'archived';
    }
  }
}

// Toggle topics and current page link on click
document.getElementById('menu-links').addEventListener('click', function(e) {
  // Keep link to current page highlighted
  menuItem = document.getElementById('menu-links').getElementsByTagName('a');
  for(i = 0; i < menuItem.length; i++) {
    if(e.target == menuItem[i]) menuItem[i].className='menu-item current';
    else menuItem[i].className='menu-item';
  }
  // Load topics for current page
  builder(myModules);
  schedule(myModules);
  // Hide schedule if expanded on small screen
  document.getElementById('calendar').getElementsByTagName('h2')[0].className='calendar';
  document.getElementById('schedule').className='hide';
});

// How to expand topic content
function openTopic(topic) {
  topic.getElementsByClassName('title')[0].className='title expand';
  topic.getElementsByClassName('nav')[0].style.display='';
}

// How to hide topic content
function closeTopic(topic) {
  topic.getElementsByClassName('title')[0].className='title';
  topic.getElementsByClassName('nav')[0].style.display='none';
}

// Show topic summary on click
document.getElementById('content').addEventListener('click', function(e) {
  topics = document.getElementsByClassName('topic');
  // Show topic summary
  for(i = 0; i < topics.length; i++) {
    if(e.target == topics[i].getElementsByClassName('title')[0] && topics[i].getElementsByClassName('title')[0].className != 'title expand') {
      openTopic(topics[i]);
      if(isHomeOrArchive() == 'Archive') {
        for(j = 0; j < topics.length; j++) {
          if(i != j) {
            closeTopic(topics[j]);
          }
        }
      }
    } else if(e.target == topics[i].getElementsByClassName('title')[0] && topics[i].getElementsByClassName('title')[0].className == 'title expand') {
      closeTopic(topics[i]);
    }
  }
});

// Toggle schedule on click on small screen
document.getElementById('calendar').addEventListener('click', function(e) {
  if(e.target == document.getElementById('calendar').getElementsByTagName('h2')[0]) {
    if(document.getElementById('calendar').getElementsByTagName('h2')[0].className !='calendar show') {
      document.getElementById('calendar').getElementsByTagName('h2')[0].className='calendar show';
      document.getElementById('schedule').className='';
    } else {
      document.getElementById('calendar').getElementsByTagName('h2')[0].className='calendar';
      document.getElementById('schedule').className='hide';
    }
  }
});

// Content
var myModules = [
  {"topics":[
  {"date":"June 3, 2019", "title":"Getting Started",
    "nav":[
      {"label":"Syllabus", "href":"supplement/syllabus/"},
      {"label":"Email Policy", "href":"supplement/syllabus/#email"},
      {"label":"Academic Integrity", "href":"supplement/syllabus/#integrity"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1"}
    ]
  },
  {"date":"June 3, 2019", "title":"Professionalism",
    "nav":[
      {"label":"Lecture", "href":"lectures/professionalism.html"},
      {"label":"Article", "href":"supplement/readings/professionalism.pdf", "filetype":"PDF"},
      {"label":"Homework", "href":"supplement/assignments/professionalism.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"3", "time":"23.59"},
      {"deliverable":"Homework", "deadline":"6"}
    ]
  },
  {"date":"June 3, 2019", "title":"Accounting Architecture",
    "nav":[
      {"label":"Lecture", "href":"lectures/accounting-architecture.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/september-2018-how-to-master-digital-age-competencies/", "filetype":"PDF"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"5", "time":"23.59"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"June 10, 2019", "title":"Business Model",
    "nav":[
      {"label":"Lecture", "href":"lectures/business-model.html"},
      {"label":"Article", "href":"supplement/readings/business-model.pdf", "filetype":"PDF"},
      {"label":"Homework", "href":"supplement/assignments/business-model.html"},
      {"label":"Diagram I", "href":"supplement/projects/diagram1.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Homework", "deadline":"6"},
      {"deliverable":"Diagram I", "deadline":"6"}
    ]
  },
  {"date":"June 10, 2019", "title":"Information",
    "nav":[
      {"label":"Lecture", "href":"lectures/information.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/june-2018-draining-the-data-swamp/"},
      {"label":"Homework", "href":"supplement/assignments/information.html"},
      {"label":"AI Report Instructions", "href":"supplement/syllabus/syllabus.html#ai-report"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"3", "time":"23.59"},
      {"deliverable":"Homework", "deadline":"6"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"June 17, 2019", "title":"Hardware",
    "nav":[
      {"label":"Lecture", "href":"lectures/hardware.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
      {"label":"Homework", "href":"supplement/assignments/hardware.html"},
      {"label":"Diagram II", "href":"supplement/projects/diagram2.html"},
      {"label":"AI Report Instructions", "href":"supplement/syllabus/syllabus.html#ai-report"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Homework", "deadline":"6"},
      {"deliverable":"Diagram II", "deadline":"6"},
      {"deliverable":"AI Report", "deadline":"6"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"June 24, 2019", "title":"Software: Open Source",
    "nav":[
      {"label":"Puzzle", "href":"supplement/puzzles/coins.html"},
      {"label":"Lecture", "href":"lectures/open-source.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2019/4/advantages-of-open-source-5-stats"},
      {"label":"Homework", "href":"supplement/assignments/open-source.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Puzzle", "deadline":"6"},
      {"deliverable":"Homework", "deadline":"6"}
    ]
  },
  {"date":"June 24, 2019", "title":"Software: Operating Systems",
    "nav":[
      {"label":"Lecture", "href":"lectures/operating-systems.html"},
      {"label":"Article", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
      {"label":"Linux I", "href":"supplement/projects/linux1.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"3", "time":"23.59"},
      {"deliverable":"Linux I", "deadline":"6"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"July 1, 2019", "title":"Storage",
    "nav":[
      {"label":"Puzzle", "href":"supplement/puzzles/logic-problem.html"},
      {"label":"Lecture", "href":"lectures/storage.html"},
      {"label":"Article", "href":"http://www.bbc.com/future/story/20190104-are-you-a-digital-hoarder?ocid=global_future_rss"},
      {"label":"Linux II", "href":"supplement/projects/linux2.html"},
      {"label":"Analytics I", "href":"supplement/projects/analytics1.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Puzzle", "deadline":"3"},
      {"deliverable":"Linux II", "deadline":"3"},
      {"deliverable":"Analytics I", "deadline":"3"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"July 8, 2019", "title":"Services",
    "nav":[
      {"label":"Puzzle", "href":"supplement/puzzles/robbers.html"},
      {"label":"Lecture", "href":"lectures/services.html"},
      {"label":"Article", "href":"https://www.oracle.com/applications/erp/what-is-erp.html"},
      {"label":"Diagram III", "href":"supplement/projects/diagram3.html"},
      {"label":"Analytics II", "href":"supplement/projects/analytics2.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Puzzle", "deadline":"6"},
      {"deliverable":"Diagram III", "deadline":"6"},
      {"deliverable":"Analytics II", "deadline":"6"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"July 15, 2019", "title":"Risk &amp; Control",
    "nav":[
      {"label":"Puzzle", "href":"supplement/puzzles/teasers.html"},
      {"label":"Lecture", "href":"lectures/risk-and-control.html"},
      {"label":"Article", "href":"supplement/readings/risk-and-control.pdf", "filetype":"PDF"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Puzzle", "deadline":"6"}
    ]
  },
  {"date":"July 15, 2019", "title":"Security",
    "nav":[
      {"label":"Lecture", "href":"lectures/security.html"},
      {"label":"Article", "href":"https://www.bbc.com/news/technology-47974583"},
      {"label":"Homework", "href":"supplement/assignments/security.html"},
      {"label":"Analytics III", "href":"supplement/projects/analytics3.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Homework", "deadline":"6"},
      {"deliverable":"Analytics III", "deadline":"6"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"July 22, 2019", "title":"Confidentiality &amp; Privacy",
    "nav":[
      {"label":"Puzzle", "href":"supplement/puzzles/math-facts.html"},
      {"label":"Lecture", "href":"lectures/confidentiality-and-privacy.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/july-2018-blockchain-disruption-and-opportunity/"},
      {"label":"Homework", "href":"supplement/assignments/confidentiality-and-privacy.html"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Puzzle", "deadline":"6"},
      {"deliverable":"Homework", "deadline":"6"}
    ]
  },
  {"date":"July 22, 2019", "title":"Availability",
    "nav":[
      {"label":"Lecture", "href":"lectures/availability.html"},
      {"label":"Article", "href":"https://www.bbc.com/news/business-46862214"},
      {"label":"Linux III", "href":"supplement/projects/linux3.html"},
      {"label":"Tech Report Instructions", "href":"supplement/syllabus/syllabus.html#tech-report"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"3", "time":"23.59"},
      {"deliverable":"Linux III", "deadline":"6"}
    ]
  }
  ]
  },
  {"topics":[
  {"date":"July 29, 2019", "title":"Processing Integrity",
    "nav":[
      {"label":"Puzzle", "href":"supplement/puzzles/checkmate.html"},
      {"label":"Lecture", "href":"lectures/processing-integrity.html"},
      {"label":"Article", "href":"https://about.draw.io/entity-relationship-diagrams-with-draw-io/"},
      {"label":"Homework", "href":"supplement/assignments/processing-integrity.html"},
      {"label":"Tech Report Instructions", "href":"supplement/syllabus/syllabus.html#tech-report"}
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
      {"deliverable":"Puzzle", "deadline":"6"},
      {"deliverable":"Homework", "deadline":"6"},
      {"deliverable":"Tech Report", "deadline":"6"}
    ]
  }
  ]
  },
  {"label":"Final Exam", "topics":[
  {"date":"August 9, 2019", "title":"Final Exam... and Beyond!",
    "nav":[
      {"label":"Exam Prep", "href":"supplement/exams/exam-prep.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/june-2018-embracing-the-new-world-of-work/"}
    ],
    "due":[
      {"deliverable":"Exam Start", "deadline":"0", "time":"12.00"},
      {"deliverable":"Exam End", "deadline":"0", "time":"13.00"}
    ]
  }
  ]
  }
]

// Build page on load
window.addEventListener('load', function(e) {
  builder(myModules);
  schedule(myModules);
});
