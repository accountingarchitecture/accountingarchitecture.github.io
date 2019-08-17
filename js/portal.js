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
            if(!isExam(modules) || (modules[i].topics[j].nav[k].label != "Article" && modules[i].topics[j].nav[k].label != "Exam Prep")) {
              navbuttons += '<a class="button" href="' + modules[i].topics[j].nav[k].href + '" target="_blank" rel="noopener" aria-label="';
              if(modules[i].topics[j].nav[k].hasOwnProperty('filetype')) navbuttons += modules[i].topics[j].nav[k].filetype + ' opens in new window"';
              else navbuttons += 'aria-label="Website opens in new window"';
              navbuttons += '>' + modules[i].topics[j].nav[k].label + '</a>';
            }
          }
        }
        if(isCurrentOrArchived(modules[i]) == 'current') topic += '<div class="topic"><h2>' + modules[i].topics[j].title + '</h2><div class="nav">' + navbuttons + '</div></div>';
        else topic += '<div class="topic"><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="nav" style="display: none">' + navbuttons + '</div></div>';
      }
      content += '<div class="module"><div class="week"><div class="label">';
      if(modules[i].hasOwnProperty('label')) content += modules[i].label;
      else content += 'Week ' + String(i + 1);
      content += '</div><div class="date">' + modules[i].date + '</div></div>' + topic + '</div>';
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
            dueDate = new Date(Date.parse(modules[i].date) + (modules[i].topics[j].due[k].deadline * 86400000) + (modules[i].topics[j].due[k].time.split(/[.]/)[0] * 3600000 + modules[i].topics[j].due[k].time.split(/[.]/)[1] * 60000));
          } else {
            dueDate = new Date(Date.parse(modules[i].date) + (modules[i].topics[j].due[k].deadline * 86400000) + 86399999);
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
    topicDate = new Date(Date.parse(module.date));
    currentDate = new Date();
    startDate = new Date(topicDate.valueOf() - (6 + topicDate.getDay()) * 86400000);
    endDate = new Date(topicDate.valueOf() + (7 - topicDate.getDay()) * 86400000);
    if(startDate < currentDate) {
      if(module.topics[r].hasOwnProperty('due')) {
        for(q = 0; q < module.topics[r].due.length; q++) {
          if(module.topics[r].due[q].hasOwnProperty('time')) {
            dueDate = new Date(Date.parse(module.date) + (module.topics[r].due[q].deadline * 86400000) + (module.topics[r].due[q].time.split(/[.]/)[0] * 3600000 + module.topics[r].due[q].time.split(/[.]/)[1] * 60000));
          } else {
            dueDate = new Date(Date.parse(module.date) + (module.topics[r].due[q].deadline * 86400000) + 86399999);
          }
          if(dueDate > currentDate) return 'current';
          else if(r == module.topics.length - 1 && q == module.topics[r].due.length - 1) return 'archived';
        }
      } else if(currentDate < endDate) return 'current';
        else return 'archived';
    }
  }
}

// Test for whether an exam is live
function isExam(modules) {
  currentDate = new Date();
  for(w = 0; w < modules.length; w++) {
    for(x = 0; x < modules[w].topics.length; x++) {
      if(modules[w].topics[x].hasOwnProperty('due')) {
        for(y = 0; y < modules[w].topics[x].due.length; y++) {
          if(modules[w].topics[x].due[y].deliverable == 'Exam Start') {
            if(modules[w].topics[x].due[y].hasOwnProperty('time')) {
              startDateTime = new Date(Date.parse(modules[w].date) + (modules[w].topics[x].due[y].deadline * 86400000) + (modules[w].topics[x].due[y].time.split(/[.]/)[0] * 3600000 + modules[w].topics[x].due[y].time.split(/[.]/)[1] * 60000));
            } else {
              startDateTime = new Date(Date.parse(modules[w].date) + (modules[w].topics[x].due[y].deadline * 86400000));
            }
          }
          if(modules[w].topics[x].due[y].deliverable == 'Exam End') {
            if(modules[w].topics[x].due[y].hasOwnProperty('time')) {
              endDateTime = new Date(Date.parse(modules[w].date) + (modules[w].topics[x].due[y].deadline * 86400000) + (modules[w].topics[x].due[y].time.split(/[.]/)[0] * 3600000 + modules[w].topics[x].due[y].time.split(/[.]/)[1] * 60000));
            } else {
              endDateTime = new Date(Date.parse(modules[w].date) + (modules[w].topics[x].due[y].deadline * 86400000) + 86399999);
            }
            if(!startDateTime) startDateTime = endDateTime - 86399999;
            if(currentDate > startDateTime && currentDate < endDateTime) return true;
          }
        }
      }
    }
  }
  return false;
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
  {"date":"August 26, 2019", "topics":[
  {"title":"Getting Started",
    "nav":[
      {"label":"Syllabus", "href":"supplement/syllabus/"},
      {"label":"Email Policy", "href":"supplement/syllabus/#email"},
      {"label":"Academic Integrity", "href":"supplement/syllabus/#integrity"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"0"},
    ],
  },
  {"title":"Professionalism",
    "nav":[
      {"label":"Lecture", "href":"lectures/professionalism.html"},
      {"label":"Article", "href":"supplement/readings/professionalism.pdf", "filetype":"PDF"},
      {"label":"Professional Email", "href":"supplement/assignments/professional-email.html"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Guest Lecture", "deadline":"2", "time":"12.40"},
      {"deliverable":"Professional Email", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"September 2, 2019", "topics":[
  {"title":"Accounting Architecture",
    "nav":[
      {"label":"Lecture", "href":"lectures/accounting-architecture.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/september-2018-how-to-master-digital-age-competencies/", "filetype":"PDF"},
    ],
    "due":[
      {"deliverable":"NO CLASS", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"}
    ],
  },
  ],
  },
  {"date":"September 9, 2019", "topics":[
  {"title":"Business Model",
    "nav":[
      {"label":"Lecture", "href":"lectures/business-model.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2019/4/ai-enterprise-8-myths-debunked"},
      {"label":"Diagram Narration", "href":"supplement/assignments/diagram-narration.html"},
    ],
    "due":[
      {"deliverable":"Guest Lecture", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Diagram Narration", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"September 16, 2019", "topics":[
  {"title":"Information",
    "nav":[
      {"label":"Lecture", "href":"lectures/information.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/june-2018-draining-the-data-swamp/"},
      {"label":"Flowchart Drawing", "href":"supplement/assignments/flowchart-drawing.html"},
      {"label":"XML Tutorial", "href":"supplement/assignments/xml-tutorial.html"},
      {"label":"AI Report Instructions", "href":"supplement/syllabus/#ai-report"},
    ],
    "due":[
      {"deliverable":"Guest Lecture", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Guest Lecture", "deadline":"2", "time":"12.40"},
      {"deliverable":"Flowchart Drawing", "deadline":"6"},
      {"deliverable":"XML Tutorial", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"September 23, 2019", "topics":[
  {"title":"Hardware",
    "nav":[
      {"label":"Lecture", "href":"lectures/hardware.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
      {"label":"AI Report Instructions", "href":"supplement/syllabus/#ai-report"},
    ],
    "due":[
      {"deliverable":"NO CLASS", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Exam I Start", "deadline":"6", "time":"10.00"},
      {"deliverable":"Exam I End", "deadline":"6", "time":"11.15"},
    ],
  },
  ],
  },
  {"date":"September 30, 2019", "topics":[
  {"title":"Software: Open Source",
    "nav":[
      {"label":"Lecture", "href":"lectures/open-source.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2019/4/advantages-of-open-source-5-stats"},
      {"label":"Open Alternatives", "href":"supplement/assignments/open-alternatives.html"},
      {"label":"AI Report Instructions", "href":"supplement/syllabus/#ai-report"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Open Alternatives", "deadline":"6"},
      {"deliverable":"AI Report", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 7, 2019", "topics":[
  {"title":"Software: Operating Systems",
    "nav":[
      {"label":"Lecture", "href":"lectures/operating-systems.html"},
      {"label":"Article", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
      {"label":"Linux Software", "href":"supplement/assignments/linux-software.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Linux Software", "deadline":"4"},
    ],
  },
  ],
  },
  {"date":"October 14, 2019", "topics":[
  {"title":"Storage",
    "nav":[
      {"label":"Lecture", "href":"lectures/storage.html"},
      {"label":"Article", "href":"http://www.bbc.com/future/story/20190104-are-you-a-digital-hoarder?ocid=global_future_rss"},
      {"label":"Linux Storage", "href":"supplement/assignments/linux-storage.html"},
    ],
    "due":[
      {"deliverable":"NO CLASS", "deadline":"0", "time":"12.40"},
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
      {"deliverable":"Linux Storage", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 21, 2019", "topics":[
  {"title":"Services",
    "nav":[
      {"label":"Lecture", "href":"lectures/services.html"},
      {"label":"Article", "href":"https://www.oracle.com/applications/erp/what-is-erp.html"},
      {"label":"E-R Drawing", "href":"supplement/assignments/er-drawing.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"E-R Drawing", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 28, 2019", "topics":[
  {"title":"Risk &amp; Control",
    "nav":[
      {"label":"Lecture", "href":"lectures/risk-and-control.html"},
      {"label":"Article", "href":"supplement/readings/risk-and-control.pdf", "filetype":"PDF"},
      {"label":"Database Installation", "href":"supplement/assignments/database-installation.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Database Installation", "deadline":"6"},
      {"deliverable":"Exam II Start", "deadline":"6", "time":"10.00"},
      {"deliverable":"Exam II End", "deadline":"6", "time":"11.15"},
    ],
  },
  ],
  },
  {"date":"November 4, 2019", "topics":[
  {"title":"Security",
    "nav":[
      {"label":"Lecture", "href":"lectures/security.html"},
      {"label":"Article", "href":"https://www.bbc.com/news/technology-47974583"},
      {"label":"Password Security", "href":"supplement/assignments/password-security.html"},
      {"label":"SQL Tutorial", "href":"supplement/assignments/sql-tutorial.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Password Security", "deadline":"6"},
      {"deliverable":"SQL Tutorial", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"November 11, 2019", "topics":[
  {"title":"Confidentiality &amp; Privacy",
    "nav":[
      {"label":"Lecture", "href":"lectures/confidentiality-and-privacy.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/july-2018-blockchain-disruption-and-opportunity/"},
      {"label":"Database Queries", "href":"supplement/assignments/database-queries.html"},
      {"label":"FERPA Tutorial", "href":"supplement/assignments/ferpa-tutorial.html"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Database Queries", "deadline":"6"},
      {"deliverable":"FERPA Tutorial", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"November 18, 2019", "topics":[
  {"title":"Availability",
    "nav":[
      {"label":"Lecture", "href":"lectures/availability.html"},
      {"label":"Article", "href":"https://www.bbc.com/news/business-46862214"},
      {"label":"Version Control", "href":"supplement/assignments/version-control.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Version Control", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"November 25, 2019", "topics":[
  {"title":"Processing Integrity",
    "nav":[
      {"label":"Lecture", "href":"lectures/processing-integrity.html"},
      {"label":"Article", "href":"supplement/readings/processing-integrity.pdf", "filetype":"PDF"},
      {"label":"Normalization", "href":"supplement/assignments/normalization.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"0", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"1", "time":"23.59"},
      {"deliverable":"NO CLASS", "deadline":"2", "time":"12.40"},
      {"deliverable":"Presentations", "deadline":"7", "time":"12.40"},
      {"deliverable":"Normalization", "deadline":"9"},
    ],
  },
  ],
  },
  {"date":"December 6, 2019", "label":"Exam Week", "topics":[
  {"title":"Final Exam... and Beyond!",
    "nav":[
      {"label":"Exam Prep", "href":"supplement/exams/exam-prep.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/june-2018-embracing-the-new-world-of-work/"},
      {"label":"Final Homework", "href":"supplement/assignments/final.html"},
    ],
    "due":[
      {"deliverable":"Final Exam Start", "deadline":"5", "time":"10.00"},
      {"deliverable":"Final Exam End", "deadline":"5", "time":"11.15"},
      {"deliverable":"Final Homework", "deadline":"5", "time":"12.00"},
    ],
  },
  ],
  },
]

// Build page on load
window.addEventListener('load', function(e) {
  builder(myModules);
  schedule(myModules);
});
