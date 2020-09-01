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
  document.getElementById('sidebar-calendar').innerHTML = '';
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
            dueDate = new Date(Date.parse(modules[i].date) + (modules[i].topics[j].due[k].deadline * 86400000) + (modules[i].topics[j].due[k].time.split(/[.]/)[0] * 3600000 + modules[i].topics[j].due[k].time.split(/[.]/)[1] * 60000) - (modules[i].topics[j].due[k].hasOwnProperty('dst') && (modules[i].topics[j].due[k].dst == 'start') * 3600000) + (modules[i].topics[j].due[k].hasOwnProperty('dst') && (modules[i].topics[j].due[k].dst == 'end') * 3600000));
          } else {
            dueDate = new Date(Date.parse(modules[i].date) + (modules[i].topics[j].due[k].deadline * 86400000) + 86399999 - (modules[i].topics[j].due[k].hasOwnProperty('dst') && (modules[i].topics[j].due[k].dst == 'start') * 3600000) + (modules[i].topics[j].due[k].hasOwnProperty('dst') && (modules[i].topics[j].due[k].dst == 'end') * 3600000));
          }
          if((dueDate > currentDate && isHomeOrArchive() == 'Home') || (dueDate < currentDate && isHomeOrArchive() == 'Archive')) {
            deliverables += '<dd>' + modules[i].topics[j].due[k].deliverable + ' : '
            if(modules[i].topics[j].due[k].deliverable.includes('<s>'))
              deliverables += dueDate.toString().split(' ')[1] + ' ' + dueDate.toString().split(' ')[2] + ' @ ' + dueDate.toString().split(' ')[4].split(':')[0] + '.' + dueDate.toString().split(' ')[4].split(':')[1] + '</s></dd>';
            else
              deliverables += dueDate.toString().split(' ')[1] + ' ' + dueDate.toString().split(' ')[2] + ' @ ' + dueDate.toString().split(' ')[4].split(':')[0] + '.' + dueDate.toString().split(' ')[4].split(':')[1] +'</dd>';
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
  document.getElementById('sidebar-calendar').innerHTML = '<h2 class="calendar">Schedule</h2><div id="schedule">' + calendar + '</div>';
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
            dueDate = new Date(Date.parse(module.date) + (module.topics[r].due[q].deadline * 86400000) + (module.topics[r].due[q].time.split(/[.]/)[0] * 3600000 + module.topics[r].due[q].time.split(/[.]/)[1] * 60000) - (module.topics[r].due[q].hasOwnProperty('dst') && (module.topics[r].due[q].dst == 'start') * 3600000));
          } else {
            dueDate = new Date(Date.parse(module.date) + (module.topics[r].due[q].deadline * 86400000) + 86399999 - (module.topics[r].due[q].hasOwnProperty('dst') && (module.topics[r].due[q].dst == 'start') * 3600000));
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
    if(e.target == menuItem[i]) {
      menuItem[i].className='menu-item current';
      document.getElementById('sidebar-links').getElementsByTagName('a')[i].className='menu-item current';
    } else {
      menuItem[i].className='menu-item';
      document.getElementById('sidebar-links').getElementsByTagName('a')[i].className='menu-item';
    }
  }
  // Load topics for current page
  builder(myModules);
  schedule(myModules);
});

// Open sidebar
document.getElementById('menuicon').addEventListener('click', function(e) {
  document.getElementById('sidebar').style.width='250px';
});

// Close sidebar
document.getElementById('closeicon').addEventListener('click', function(e) {
  document.getElementById('sidebar').style.width='0';
});

// Toggle topics and current page link on click in sidebar
document.getElementById('sidebar-links').addEventListener('click', function(e) {
  // Keep link to current page highlighted
  menuItem = document.getElementById('sidebar-links').getElementsByTagName('a');
  var touched = false;
  for(i = 0; i < menuItem.length; i++) {
    if(e.target == menuItem[i]) touched = true;
  }
  if(Boolean(touched)) {
    for(i = 0; i < menuItem.length; i++) {
      if(e.target == menuItem[i]) {
        menuItem[i].className='menu-item current';
        document.getElementById('menu-links').getElementsByTagName('a')[i].className='menu-item current';
      } else {
        menuItem[i].className='menu-item';
        document.getElementById('menu-links').getElementsByTagName('a')[i].className='menu-item';
      }
    }
    // Load topics for current page
    builder(myModules);
    schedule(myModules);
  }
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

// Content
var myModules = [
  {"date":"August 17, 2020", "topics":[
  {"title":"Getting Started",
    "nav":[
      {"label":"Syllabus", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/"},
      {"label":"Email Policy", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#email"},
      {"label":"Academic Integrity", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#integrity"},
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
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Professional Email", "deadline":"5"},
    ],
  },
  ],
  },
  {"date":"August 24, 2020", "topics":[
  {"title":"Accounting Architecture",
    "nav":[
      {"label":"Lecture", "href":"lectures/accounting-architecture.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/september-2018-how-to-master-digital-age-competencies/", "filetype":"PDF"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"2"},
    ],
  },
  {"title":"Business Model",
    "nav":[
      {"label":"Lecture", "href":"lectures/business-model.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2019/4/ai-enterprise-8-myths-debunked"},
      {"label":"Diagram Narration", "href":"supplement/assignments/diagram-narration.html"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"4"},
      {"deliverable":"Diagram Narration", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"August 31, 2020", "topics":[
  {"title":"Information",
    "nav":[
      {"label":"Lecture", "href":"lectures/information.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/june-2018-draining-the-data-swamp/"},
      {"label":"Classification", "href":"supplement/assignments/classification.html"},
      {"label":"Flowchart Drawing", "href":"supplement/assignments/flowchart-drawing.html"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
      {"label":"AI Report Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#ai-report"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Classification", "deadline":"6"},
      {"deliverable":"Flowchart Drawing", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"September 9, 2020", "topics":[
  {"title":"Hardware",
    "nav":[
      {"label":"Lecture", "href":"lectures/hardware.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
      {"label":"AI Report Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#ai-report"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"1"},
      {"deliverable":"Exam Start", "deadline":"3", "time":"10.00"},
      {"deliverable":"Last Appointment", "deadline":"4", "time":"22.00"},
      {"deliverable":"Exam End", "deadline":"4"},
    ],
  },
  ],
  },
  {"date":"September 14, 2020", "topics":[
  {"title":"Software: Open Source",
    "nav":[
      {"label":"Lecture", "href":"lectures/open-source.html"},
      {"label":"Article", "href":"https://enterprisersproject.com/article/2019/4/advantages-of-open-source-5-stats"},
      {"label":"Open Solutions", "href":"supplement/assignments/open-solutions.html"},
      {"label":"AI Report Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#ai-report"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Open Solutions", "deadline":"6"},
      {"deliverable":"AI Report", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"September 21, 2020", "topics":[
  {"title":"Software: Operating Systems",
    "nav":[
      {"label":"Lecture", "href":"lectures/operating-systems.html"},
      {"label":"Article", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
      {"label":"Linux Software", "href":"supplement/assignments/linux-software.html"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Linux Software", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"September 28, 2020", "topics":[
  {"title":"Storage",
    "nav":[
      {"label":"Lecture", "href":"lectures/storage.html"},
      {"label":"Article", "href":"http://www.bbc.com/future/story/20190104-are-you-a-digital-hoarder?ocid=global_future_rss"},
      {"label":"E-R Diagrams", "href":"supplement/assignments/entity-relationships.html"},
      {"label":"Linux Storage", "href":"supplement/assignments/linux-storage.html"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"E-R Diagrams", "deadline":"6"},
      {"deliverable":"Linux Storage", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 5, 2020", "topics":[
  {"title":"Services",
    "nav":[
      {"label":"Lecture", "href":"lectures/services.html"},
      {"label":"Article", "href":"https://www.oracle.com/applications/erp/what-is-erp.html"},
      {"label":"DB Installation", "href":"supplement/assignments/database-installation.html"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"DB Installation", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 12, 2020", "topics":[
  {"title":"Risk &amp; Control",
    "nav":[
      {"label":"Lecture", "href":"lectures/risk-and-control.html"},
      {"label":"Article", "href":"supplement/readings/risk-and-control.pdf", "filetype":"PDF"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
      {"label":"SQL Tutorial", "href":"supplement/assignments/sql-tutorial.html"},
      {"label":"Tech Report Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#tech-report"},
    ],
    "due":[
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Exam Start", "deadline":"5", "time":"10.00"},
      {"deliverable":"Last Appointment", "deadline":"6", "time":"22.00"},
      {"deliverable":"Exam End", "deadline":"6"},
      {"deliverable":"SQL Tutorial", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 19, 2020", "topics":[
  {"title":"Security",
    "nav":[
      {"label":"Lecture", "href":"lectures/security.html"},
      {"label":"Article", "href":"https://www.bbc.com/news/technology-47974583"},
      {"label":"Password Security", "href":"supplement/assignments/password-security.html"},
      {"label":"DB Queries", "href":"supplement/assignments/database-queries.html"},
      {"label":"Tech Report Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#tech-report"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Password Security", "deadline":"6"},
      {"deliverable":"DB Queries", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"October 26, 2020", "topics":[
  {"title":"Confidentiality &amp; Privacy",
    "nav":[
      {"label":"Lecture", "href":"lectures/confidentiality-and-privacy.html"},
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/july-2018-blockchain-disruption-and-opportunity/"},
      {"label":"FERPA Tutorial", "href":"supplement/assignments/ferpa-tutorial.html"},
      {"label":"Tech Report Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#tech-report"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"FERPA Tutorial", "deadline":"6", "dst":"end"},
      {"deliverable":"Tech Report", "deadline":"6", "dst":"end"},
    ],
  },
  ],
  },
  {"date":"November 2, 2020", "topics":[
  {"title":"Availability",
    "nav":[
      {"label":"Lecture", "href":"lectures/availability.html"},
      {"label":"Article", "href":"https://www.bbc.com/news/business-46862214"},
      {"label":"Version Control", "href":"supplement/assignments/version-control.html"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Version Control", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"November 9, 2020", "topics":[
  {"title":"Processing Integrity",
    "nav":[
      {"label":"Lecture", "href":"lectures/processing-integrity.html"},
      {"label":"Article", "href":"supplement/readings/processing-integrity.pdf", "filetype":"PDF"},
      {"label":"Normalization", "href":"supplement/assignments/normalization.html"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
    ],
    "due":[
      {"deliverable":"Presentations", "deadline":"2", "time":"12.40"},
      {"deliverable":"Quiz", "deadline":"2"},
      {"deliverable":"Normalization", "deadline":"6"},
    ],
  },
  ],
  },
  {"date":"November 18, 2020", "label":"Final Exam", "topics":[
  {"title":"Final Exam... and Beyond!",
    "nav":[
      {"label":"Article", "href":"https://sfmagazine.com/post-entry/june-2018-embracing-the-new-world-of-work/"},
      {"label":"ProctorU Instructions", "href":"https://accountingarchitecture.github.io/syllabi/acct-4020-001-2020f/#proctoru"},
      {"label":"Final Homework", "href":"supplement/assignments/final-homework.html"},
    ],
    "due":[
      {"deliverable":"Exam Start", "deadline":"0", "time":"10.00"},
      {"deliverable":"Last Appointment", "deadline":"0", "time":"22.00"},
      {"deliverable":"Exam End", "deadline":"0"},
      {"deliverable":"Final Homework", "deadline":"0"},
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
