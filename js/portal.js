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
      content += '<div class="module"><div class="week"><div class="label">' + modules[i].week + '</div><div class="date">' + modules[i].topics[0].date + '</div></div>' + topic + '</div>';
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
      calendar += '<h3 class="calendar">' + modules[i].week + '</h3><dl>' + topics + '</dl>';
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
  {"week":"Week 1",
  "topics":[
    {"date":"January 14, 2019", "title":"Getting Started",
      "summary":"<p>Welcome to ACCT 4020 &ndash; Accounting and Information Systems. To begin, carefully read the course syllabus. You will find a link to the syllabus in the navigation buttons below. The syllabus explains the course policies, objectives, and deliverables. The more carefully you read the syllabus, the better prepared you will be for the unique nature of the course. After reading, you will find a Getting Started quiz on eCourseware.</p><p>All current and future topics for this course are listed on the Home page on this course portal. Once a topic is no longer current, it will be moved to the Archive, where all past topics, deliverables, and dates will be stored for future reference. You can find the Archive by clicking on the link in the top-right corner of this page.</p>",
      "nav":[
        {"label":"Syllabus", "href":"supplement/getting-started/syllabus.html"},
        {"label":"Email Policy", "href":"supplement/getting-started/syllabus.html#email"},
        {"label":"Academic Integrity", "href":"supplement/getting-started/syllabus.html#integrity"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"1"}
      ]
    },
    {"date":"January 14, 2019", "title":"Professionalism",
      "summary":"<p>Before we get into the technical content for this course, I would like first to talk about your future as a professional. This lecture focuses on the traits of a professional in the context of issues relevant to accountants. I hope that the lecture will inspire you as you prepare yourself for job interviews, internships, careers, and life. You should read the lecture and the article in preparation for the quiz. The schedule lists the quiz due date.</p><p>Professionalism will be important throughout this course. I will communicate with you in a professional manner, and I expect the same from you. The homework assignment will reinforce the practice of drafting professional emails, which is an important part of professional communication.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/professionalism.html"},
        {"label":"Article", "href":"supplement/professionalism/christensen.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/professionalism/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3", "time":"23.59"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 2",
  "topics":[
    {"date":"January 22, 2019", "title":"Accounting Architecture",
        "summary":"<p>This topic marks the start of the core content of this course. Many of the terms in this lecture may be foreign to you. Some terms will be foreign because I invented them. For example, I coined the term &ldquo;accounting architecture&rdquo; to describe the design of an enterprise-grade information system from the perspective of an accountant. (As an aside: I frequently use the term &ldquo;enterprise-grade&rdquo; throughout this course to highlight the tools and protocols that a large corporation would use.) Accounting architecture is the focus of this course, and this lecture introduces the framework and the topics we will discuss for the remainder of the semester.</p><p>Because this topic is the first core topic of the semester, reading and understanding this and all remaining lectures and accompanying articles during the semester are not only preparation for the quizzes. They are also preparation for the exams. As a result, you should carefully study each topic's lecture and article in order to score well on the quizzes and exams and acquire knowledge that will benefit you for your career.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/accounting-architecture.html"},
        {"label":"Article", "href":"supplement/accounting-architecture/pwc.pdf", "filetype":"PDF"},
        {"label":"AI Report Instructions", "href":"supplement/getting-started/syllabus.html#ai-report"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"1", "time":"23.59"}
      ]
    },
    {"date":"January 22, 2019", "title":"Business Model",
      "summary":"<p>The majority of the course will address the Information, Technology, and Control sections of the accounting architecture framework. With regards to the Environment section of the framework, Compliance is especially important for accountants, but this is primarily the focus of other accounting courses. However, a discussion of the other two Environment blocks, Business Model and Risk, is worthwhile to motivate and give context to the other sections of the arch. You will learn about Risk later in the course in connection with the Control section. We discuss Business Model at this point for two reasons. First, this foundational block highlights the informational needs of internal and external stakeholders, which will prepare you to learn about the Information section of the arch. Second, diagrams are the primary tool for communicating the processes that make up the business model, and discussing business processes is a useful way to learn how to read and draw diagrams.</p><p>The homework assignment will give you experience reading and interpreting diagrams. You can find the solution to this homework under the Content section of eCoursware following the assignment due date.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/business-model.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2015/8/aspire-be-technology-strategist-whatever-your-title-says"},
        {"label":"Homework", "href":"supplement/business-model/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3", "time":"23.59"},
        {"deliverable":"Homework", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 3",
  "topics":[
    {"date":"January 28, 2019", "title":"Information",
      "summary":"<p>The Information section of the accounting architecture model is the core competency of the information sciences discipline. As a result, my wife and co-author, Ms. Emily Coyne, who has a master's degree in information science, has crafted the lecture for this topic. This lecture will explain the role that an information system should play (i.e., what the system <em>does</em>).</p><p>Starting this week, I have added a puzzle designed to get your creative juices flowing. I will provide puzzles on occasion throughout the semester. They are completely optional, but I will give extra credit for each correct solution. The schedule reports the puzzle due dates. After each due date, you can find the correct puzzle solution under the Content section of eCourseware.</p><p>As a reminder, your AI reports will be due next week. You should already have begun researching and collecting references. The button below links to the syllabus explanation of the report requirements. Please remember that the <a href=\"http://www.memphis.edu/cwc/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Website opens in new window\">Center for Writing and Communication</a> is available to help you to draft and revise your report.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/coins.html"},
        {"label":"Lecture", "href":"lectures/information.html"},
        {"label":"Article", "href":"supplement/information/cpas-and-big-data.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/information/assignment.html"},
        {"label":"AI Report Instructions", "href":"supplement/getting-started/syllabus.html#ai-report"}

      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Puzzle", "deadline":"6"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    },
  ]
  },
  {"week":"Week 4",
  "topics":[
    {"date":"February 4, 2019", "title":"Hardware",
      "summary":"<p>This is the first lecture on the Technology section of the accounting architecture framework. Although this is not the most interesting lecture of the course&mdash;I know that some of you would snicker and say that none of the lectures in this course are the <em>most</em> interesting&mdash;familiarity with computer hardware is an important first step toward understanding the makeup of an information system.</p><p>Your AI reports are also due this week. You should have already completed the research for this report, and I encourage you to spend enough time writing to prepare multiple drafts. Please remember that the <a href=\"http://www.memphis.edu/cwc/\" target=\"_blank\" rel=\"noopener\" aria-label=\"Website opens in new window\">Center for Writing and Communication</a> is available to help you to draft and revise your report.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/hardware.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
        {"label":"Homework", "href":"supplement/hardware/assignment.html"},
        {"label":"AI Report Instructions", "href":"supplement/getting-started/syllabus.html#ai-report"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Homework", "deadline":"6"},
        {"deliverable":"AI Report", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 5",
  "topics":[
    {"date":"February 11, 2019", "title":"Software: Open Source",
      "summary":"<p>This lecture begins our discussion of the Software block of the arch. This first Software lecture introduces the most important concept in enterprise-grade software today: open source. However, because the term &ldquo;open&rdquo; applies to more than just software, the lecture introduces multiple aspects of openness that affect information systems. Openness also heavily influences the breadth of tools that we use for personal computing each and every day.</p><p>The homework assignment for this topic will help you to understand differences between open and closed content. You can find the solution to this homework under the Content section of eCoursware following the assignment due date.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/open-source.html"},
        {"label":"Article", "href":"https://opensource.com/article/17/8/enterprise-open-source-advantages"},
        {"label":"Homework", "href":"supplement/open-source/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    },
    {"date":"February 11, 2019", "title":"Software: Operating Systems",
      "summary":"<p>The second Software lecture introduces the most fundamental software in an information system: the operating system. This lecture provides an explanation of what an operating system is, as well as a brief history of the most prominent enterprise-grade operating systems. (Hint: Windows is not on the list.)</p><p>The homework assignment will begin to give you experience with using the operating system that powers most information systems. Subsequent homework assignments will build on this initial experience.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/operating-systems.html"},
        {"label":"Article", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
        {"label":"Homework", "href":"supplement/operating-systems/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"4", "time":"23.59"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 6",
  "topics":[
    {"date":"February 18, 2019", "title":"Storage",
      "summary":"<p>This lecture covers the Storage block of the arch. Data storage is especially important for operationalizing the information and Big Data life cycles in order for raw data to transition successfully into retrievable, accurate information. The concepts in this lecture will arise again in the Control section of the accounting architecture framework, as well as the Data Analytics topic.</p><p>The homework assignment for this topic will also provide valuable preparation for completing the analytics project, so I encourage you to spend plenty of time on it and not shortcut the learning experience.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/logic-problem.html"},
        {"label":"Lecture", "href":"lectures/storage.html"},
        {"label":"Article", "href":"http://www.bbc.com/future/story/20190104-are-you-a-digital-hoarder?ocid=global_future_rss"},
        {"label":"Homework", "href":"supplement/storage/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Puzzle", "deadline":"6"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 7",
  "topics":[
    {"date":"February 25, 2019", "title":"Services",
      "summary":"<p>Services is the fourth block in the Technology section of the accounting architecture framework. This lecture places the other previously discussed technologies (Hardware, Software, and Storage) in the context of cloud computing, which is a crucial part of enterprise-grade computing.</p><p>I encourage you to begin working on this week's homework assignment early. The homework instructions explain how to complete the assignment, but some troubleshooting may be necessary. The earlier you begin, the more time you will have to troubleshoot any errors that may, and likely will, arise.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/robbers.html"},
        {"label":"Lecture", "href":"lectures/services.html"},
        {"label":"Article", "href":"https://www.oracle.com/applications/erp/what-is-erp.html"},
        {"label":"Project Part 1", "href":"supplement/data-analytics/project-part1.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Puzzle", "deadline":"6"},
        {"deliverable":"Project Part 1", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 8",
  "topics":[
    {"date":"March 11, 2019", "title":"Risk &amp; Control",
      "summary":"<p>Control is the final section of the accounting architecture framework. This lecture begins with a discussion of Risk, which is the third block in the Environment section, and then introduces internal controls, which protect against risk. Over the past two decades, internal controls have become a central focus of the accounting profession.</p><p>This topic has no homework assignment. Instead, you should use this time to study for and take the midterm exam. The exam covers all lectures on accounting architecture through the end of the Technology section. You will find the exam on eCourseware. It is similar to the lecture quizzes. <em>I will not reopen or extend the exam for any reason</em>. This is a timed, closed-book exam. You must complete the exam in one sitting, and you may not reference any resources while completing the exam. You may also not discuss the exam with any other individual until after the exam due date.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/risk-and-control.html"},
        {"label":"Article", "href":"supplement/risk-and-control/coso.pdf", "filetype":"PDF"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Midterm Exam", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 9",
  "topics":[
    {"date":"March 18, 2019", "title":"Security",
      "summary":"<p>Security is the first block of the Control section of the accounting architecture framework. The recent surge in cyber attacks and malicious software has made security a primary focus for all systems designers and maintainers, and businesses have increasingly viewed security as a responsibility shared by all employees, regardless of their title or job description.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/teasers.html"},
        {"label":"Lecture", "href":"lectures/security.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2017/3/it-security-start-3-ways-make-it-business-priority"},
        {"label":"Homework", "href":"supplement/security/assignment.html"},
        {"label":"Tech Report Instructions", "href":"supplement/getting-started/syllabus.html#tech-report"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Puzzle", "deadline":"6"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 10",
  "topics":[
    {"date":"March 25, 2019", "title":"Confidentiality",
      "summary":"<p>Confidentiality is the second block of the Control section. The concepts of this lecture explain some of the building blocks underlying the famous cryptocurrency Bitcoin, but they also apply heavily to everyday Internet traffic.</p><p>Please reserve extra time to complete assignments this week. In addition to the homework assignment, part 1 of the analytics project is due this week. The project instructions explain how to use MySQL&mdash;a popular open source RDBMS&mdash;to import a database and run SQL queries to analyze data in that database. You can find the solution to project part 1 under the Content section of eCourseware after the project due date. I will not accept any late project submissions. You should begin this project early to leave plenty of time for troubleshooting.</p><p>Also, instead of holding class on Thursday, I will offer exam retakes in our classroom during class time. Everyone who does not need to retake the midterm should use this time to work on the project.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/confidentiality.html"},
        {"label":"Article", "href":"supplement/confidentiality/blockchain.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/confidentiality/assignment.html"},
        {"label":"Tech Report Instructions", "href":"supplement/getting-started/syllabus.html#tech-report"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Homework", "deadline":"6"},
        {"deliverable":"Tech Report", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 11",
  "topics":[
    {"date":"April 1, 2019", "title":"Availability",
      "summary":"<p>Availability is the third Control block. The concepts in this lecture tie into the Services block because availability most frequently applies to cloud computing.</p><p>I again advise you to begin the homework assignment early. The homework instructions provide multiple pages of step-by-step instructions, but troubleshooting may again be necessary. You will not need to submit anything to Dropbox for this assignment. Once it is complete, I will receive a notification automatically. However, you will only receive credit for this assignment if it is complete, and I receive a notification. I will not award partial credit for trying.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/math-facts.html"},
        {"label":"Lecture", "href":"lectures/availability.html"},
        {"label":"Article", "href":"https://opensource.com/article/18/2/how-clone-modify-add-delete-git-files"},
        {"label":"Homework", "href":"supplement/availability/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Puzzle", "deadline":"6"},
        {"deliverable":"Homework", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 12",
  "topics":[
    {"date":"April 8, 2019", "title":"Processing Integrity",
      "summary":"<p>Processing Integrity is the final Control block. This lecture strongly relates to the Storage block because processing integrity addresses error prevention in data stores, especially relational databases. Because of Thanksgiving Break next week, I have dedicated this week and the early part of next week to this topic.</p><p>One reason for reserving extra time for this topic is the complexity of one component of processing integrity: database normalization. The homework assignment combines the concepts of normalization with entity-relationships diagrams from the Storage lecture. Careful reading of this lecture and a thorough understanding of normalization and ER diagrams are necessary in order to complete this week's assignment.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/checkmate.html"},
        {"label":"Lecture", "href":"lectures/processing-integrity.html"},
        {"label":"Article", "href":"https://about.draw.io/entity-relationship-diagrams-with-draw-io/"},
        {"label":"Homework", "href":"supplement/processing-integrity/assignment.html"},
        {"label":"Project Part 2", "href":"supplement/data-analytics/project-part2.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Puzzle", "deadline":"6"},
        {"deliverable":"Homework", "deadline":"6"},
        {"deliverable":"Project Part 2", "deadline":"6"}
      ]
    }
  ]
  },
  {"week":"Week 13/14",
  "topics":[
    {"date":"April 15, 2019", "title":"Data Analytics",
      "summary":"<p>The final topic of this course is data analytics. Data analytics is a huge issue in the business and accounting world today, and employers view it as a vital skill. Effective data analytics relies on an accurate understanding of all aspects of accounting architecture.</p><p>This lecture introduces multiple analytical tools and programming languages, but the analytics project focuses on one: SQL. I have reserved the remainder of the semester for this topic and the analytics project. If you have not already done so, you must complete project part 1 before you can attempt project part 2. You cannot submit the solution to project part 1 at this point for credit, but project part 1 prepares the database that you will use in project part 2. You can find the solution to project part 2 under the Content section of eCourseware after the project due date. I will not accept any late project submissions.</p><p>Please note that the deadlines for this topics's deliverables are the last day of classes. That will give you plenty of time to complete both deliverables, but I encourage you not to procrastinate working on part 2 of the analytics project. Also note that you must complete project part 2 before completing this topic's homework assignment, as the homework assignment instructs you to delete your Codeanywhere account, which you need for the analytics project. Also, if you wish to submit any late homework assignments for credit, you must submit them and notify me before the last day of classes.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/data-analytics.html"},
        {"label":"Article", "href":"supplement/data-analytics/analytics-and-auditing.pdf", "filetype":"PDF"},
        {"label":"Project Part 3", "href":"supplement/data-analytics/project-part3.html"},
        {"label":"Dictionary", "href":"supplement/data-analytics/data-dictionary.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/final/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2", "time":"23.59"},
        {"deliverable":"Project Part 3", "deadline":"9"},
        {"deliverable":"Homework", "deadline":"9"}
      ]
    }
  ]
  },
  {"week":"Final",
  "topics":[
    {"date":"April 27, 2019", "title":"Final Exam",
      "summary":"<p>You have until <strong>December 13 @ 10.00</strong> to complete the final exam. The exam is on eCourseware. <em>I will not reopen or extend the exam for any reason</em>. This is a timed, closed-book exam. You must complete the exam in one sitting, and you may not reference any resources while completing the exam. You may also not discuss the exam with any other individual until after the exam due date.</p><p><strong>Good luck!</strong></p>",
      "due":[
        {"deliverable":"Final Exam", "deadline":"0", "time":"23.59"}
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
