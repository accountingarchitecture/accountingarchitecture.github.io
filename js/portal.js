// Build Content HTML
function builder(modules) {
  document.getElementById('content').innerHTML = '';
  document.getElementById('page').scrollTop = 0;
  var content = '';
  for(i = 0; i < modules.length; i++) {
    var topic = '';
    if((isCurrentOrArchived(modules[i].topics[0]) != 'archived' && isHomeOrArchive() == 'Home') || (isCurrentOrArchived(modules[i].topics[0]) == 'archived' && isHomeOrArchive() == 'Archive')) {
      for(j = 0; j < modules[i].topics.length; j++) {
        var navbuttons = '';
        var readsets = '';
        var readbuttons = '';
        if(modules[i].topics[j].hasOwnProperty('nav')) {
          for(k = 0; k < modules[i].topics[j].nav.length; k++) {
            if(!(~modules[i].topics[j].nav[k].type.indexOf('assignmentbutton') != 0 && isHomeOrArchive() == 'Archive') && !(~modules[i].topics[j].nav[k].type.indexOf('solutionbutton') != 0 && isHomeOrArchive() == 'Home')) {
              navbuttons += '<a class="' + modules[i].topics[j].nav[k].type + '" ';
              if(modules[i].topics[j].nav[k].hasOwnProperty('href')) {
                if(modules[i].topics[j].nav[k].hasOwnProperty('filetype')) navbuttons += 'href="' + modules[i].topics[j].nav[k].href + '" target="_blank" rel="noopener" aria-label="' + modules[i].topics[j].nav[k].filetype + ' opens in new window"';
                else navbuttons += 'href="' + modules[i].topics[j].nav[k].href + '" target="_blank" rel="noopener" aria-label="Website opens in new window"';
              }
              navbuttons += '>' + modules[i].topics[j].nav[k].label + '</a>';
            }
          }
        }
        if(isCurrentOrArchived(modules[i].topics[0]) == 'current') topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title expand">' + modules[i].topics[j].title + '</h2><div class="summary">' + modules[i].topics[j].summary + '</div><div class="nav">' + navbuttons + '</div></div>';
        else topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="summary" style="display: none">' + modules[i].topics[j].summary + '</div><div class="nav" style="display: none">' + navbuttons + '</div></div>';
      }
      content += '<div class="module"><div class="week">' + modules[i].week + '</div>' + topic + '</div>';
    }
  }
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
          if(dueDate > currentDate) {
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
  document.getElementById('calendar').innerHTML = '<h2 class="calendar">Schedule</h2><div id="schedule" class="hide">' + calendar + '</div>';
}

// Test for current page
function isHomeOrArchive() {
  menuItem = document.getElementById('menu-links').getElementsByTagName('a');
  for(z = 0; z < menuItem.length; z++) {
    if(menuItem[z].className == 'menu-item current') return menuItem[z].textContent;
  }
}

// Test for topic currency
function isCurrentOrArchived(topic) {
  topicDate = new Date(Date.parse(topic.date));
  currentDate = new Date();
  startDate = new Date(topicDate.valueOf() - (6 + topicDate.getDay()) * 86400000);
  endDate = new Date(topicDate.valueOf() + ((6 - topicDate.getDay()) * 86400000) + 86399999);
  if(startDate < currentDate && currentDate <= endDate) return 'current';
  else if(currentDate > endDate) return 'archived';
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
  // Hide schedule if expanded on small screen
  document.getElementById('calendar').getElementsByTagName('h2')[0].className='calendar';
  document.getElementById('schedule').className='hide';
});

// How to expand topic content
function openTopic(topic) {
  topic.getElementsByClassName('title')[0].className='title expand';
  topic.getElementsByClassName('summary')[0].style.display='';
  topic.getElementsByClassName('nav')[0].style.display='';
}

// How to hide topic content
function closeTopic(topic) {
  topic.getElementsByClassName('title')[0].className='title';
  topic.getElementsByClassName('summary')[0].style.display='none';
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
    {"date":"August 28, 2017", "title":"Getting Started",
      "summary":"<p>Welcome to ACCT 4020 &ndash; Accounting and Information Systems. To begin, carefully read the course syllabus. You will find a link to the syllabus in the navigation buttons below. The syllabus explains the course policies, objectives, and deliverables. The more carefully you read the syllabus, the better prepared you will be for the unique nature of the course. The other buttons listed below link to individual components of the syllabus that are required by the Fogelman College. After reading, you will find a syllabus quiz on eCourseware.</p>" ,
      "nav":[
        {"label":"Syllabus", "type":"button", "href":"supplement/getting-started/syllabus.html"},
        {"label":"Course Description", "type":"button", "href":"supplement/getting-started/syllabus.html#description"},
        {"label":"Instructor", "type":"button", "href":"supplement/getting-started/syllabus.html#instructor"},
        {"label":"Academic Integrity", "type":"button", "href":"supplement/getting-started/syllabus.html#integrity"},
        {"label":"Accessibility Assistance", "type":"button", "href":"supplement/getting-started/syllabus.html#accessibility"}
      ],
      "due":[
        {"deliverable":"Syllabus Quiz", "deadline":"1"}
      ]
    },
    {"date":"August 28, 2017", "title":"Practice Set",
      "summary":"<p>The practice set will test your understanding of financial accounting principles in a digital business environment. You will have one attempt at this assignment, and it is worth a substantial portion of your final grade. The reason for this is that it takes approximately 20 hours to complete, and I want the grade weighting to be commensurate with the amount of effort. The syllabus reports the due date for this assignment. <em>I will not change the due date for any reason</em>. In order to keep you on track with this assignment, I have set a number of intermediate milestones. Each milestone involves completing a portion of the practice set each week. The Milestones button links to an explanation of these milestones, and the course schedule reports the milestone due dates.</p><p>The practice set introduction and supporting documentation provide all the information necessary in order to complete each practice set task successfully. The Quiz Instructions lists the readings that I most recommend. You should complete those readings, the practice set introduction, and the quiz before attempting the first milestone. I also provide a video tutorial as a walkthrough. You may watch as much or as little of the tutorial as you feel you need.</p><p>NB: Every semester students email me after attempting part of the practice set to complain that it is too hard or confusing. The reason for these emails is always, <strong>always</strong>, <strong>ALWAYS</strong> because the students have not read what I assigned. I urge you not to assume that you can succeed at this practice set without reading the supporting documents.",
      "nav":[
        {"label":"Instructions", "type":"button", "href":"supplement/getting-started/syllabus.html#practiceset"},
        {"label":"Practice Set", "type":"button", "href":"http://www.perdisco.com/"},
        {"label":"Quiz Instructions", "type":"button", "href":"supplement/practice-set/quiz-instructions.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"},
        {"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=EBDM_m0_CQA"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"5"},
      ]
    },
    {"date":"August 30, 2017", "title":"Professionalism",
      "summary":"<p>Before we get into the technical content for this course, I would like first to talk about your future as a professional. This lecture focuses on the traits of a professional in the context of issues relevant to accountants. I hope that the lecture will inspire you as you prepare yourself for job interviews, internships, careers, and life. Students should read the lecture and the article in preparation for the quiz. The schedule lists the quiz due date. Throughout the semester, lecture quizzes are due before class on the quiz due date.</p><p>Professionalism will be important throughout this course. Although I will not require it, I invite students to dress professionally when coming to my office. Also, I will communicate with you in a professional manner, and I expect the same from you. The homework assignment will reinforce this practice.</p>",
      "nav":[
        {"label":"Lecture", "type":"button", "href":"lectures/professionalism.html"},
        {"label":"Article", "type":"button", "href":"supplement/professionalism/christensen.pdf", "filetype":"PDF"},
        {"label":"Homework", "type":"button", "href":"supplement/professionalism/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Homework", "deadline":"3"}
      ]
    }
  ]
  },
  {"week":"Week 2",
  "topics":[
    {"date":"September 6, 2017", "title":"Accounting Architecture",
        "summary":"<p>This topic marks the start of the core content of this course. Many of the terms in this lecture may be foreign to you. Some terms will be foreign because I invented them. For example, I coined the term &ldquo;accounting architecture&rdquo; to describe the design of an enterprise-grade information system from the perspective of an accountant. (As an aside: I frequently use the term &ldquo;enterprise-grade&rdquo; throughout this course to highlight the tools and protocols that a large corporation would use.) Accounting architecture is the focus of this course, and this lecture introduces the framework and the topics we will discuss for the remainder of the semester.</p><p>Starting this week, I will include a puzzle each week. These are designed to get your creative juices flowing. They are completely optional, but I will give extra credit for each correct solution. Once the topic is archived, I will replace the puzzle with its solution.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/sudoku.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/sudoku-solution-wxkfp.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/accounting-architecture.html"},
        {"label":"Article", "type":"button", "href":"supplement/accounting-architecture/pwc.pdf", "filetype":"PDF"},
        {"label":"Homework", "type":"button", "href":"supplement/accounting-architecture/assignment.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"3"},
        {"deliverable":"Milestone 1", "deadline":"3"}
      ]
    }
  ]
  },
  {"week":"Week 3",
  "topics":[
    {"date":"September 11, 2017", "title":"Business Model",
      "summary":"<p>The majority of the course will address the Information, Technology, and Control sections of the accounting architecture framework. Compliance is important, but this is primarily the topic of other accounting courses. However, a discussion of the other two Environment blocks, Business Model and Risk, is worthwhile to motivate and give context to the other sections of the arch. We discuss the Risk block later in connection with the Control section. We discuss Business Model at this point for two reasons. First, this foundational block highlights the informational needs of internal and external stakeholders. Second, diagrams are the primary tool for communicating the processes that make up the business model, and discussing a business model is a useful way to learn how to read and draw diagrams.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/robbers.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/robbers-solution-uhxxx.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/business-model.html"},
        {"label":"Article", "type":"button", "href":"https://enterprisersproject.com/article/2015/8/aspire-be-technology-strategist-whatever-your-title-says"},
        {"label":"Homework", "type":"button assignmentbutton", "href":"supplement/business-model/assignment.html"},
        {"label":"Homework", "type":"button solutionbutton", "href":"supplement/business-model/solution-uhxep.html"},
        {"label":"Diagram 1", "type":"button", "href":"supplement/business-model/payment-process.png", "filetype":"Image"},
        {"label":"Diagram 2", "type":"button", "href":"supplement/business-model/sales-order.png", "filetype":"Image"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 2", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 4",
  "topics":[
    {"date":"September 18, 2017", "title":"Information",
      "summary":"<p>The Information section of the accounting architecture model is the core competency of the information sciences discipline. As a result, I have asked my wife and co-author, Ms. Emily Coyne, who has a master's degree in information science to write the lecture for this topic. This lecture will explain the role that an information system should play (i.e., what the system <em>does</em>).</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/coins.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/coins-solution-umgqj.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/information.html"},
        {"label":"Article", "type":"button", "href":"supplement/information/cpas-and-big-data.pdf", "filetype":"PDF"},
        {"label":"Homework", "type":"button", "href":"supplement/information/assignment.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 3", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 5",
  "topics":[
    {"date":"September 25, 2017", "title":"Hardware",
      "summary":"<p>This is the first lecture on the Technology section of the accounting architecture framework. Although this is not the most interesting lecture of the course&mdash;I know that some of you would snicker and say that none of the lectures in this course were the <em>most</em> interesting&mdash;familiarity with computer hardware is an important first step toward understanding systems design.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/tangram.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/tangram-solution-tnclb.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/hardware.html"},
        {"label":"Article", "type":"button", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
        {"label":"Homework", "type":"button", "href":"supplement/hardware/assignment.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 4", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 6",
  "topics":[
    {"date":"October 2, 2017", "title":"Software: Open Source",
      "summary":"<p>This lecture begins our multi-week discussion of the Software block of the arch. This first lecture introduces the most important concept in enterprise-grade software today: open source. The term &ldquo;open&rdquo; applies to more than only software, and the lecture introduces other aspects of openness, as well.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/teasers.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/teasers-solution-qryjz.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/open-source.html"},
        {"label":"Article", "type":"button", "href":"https://opensource.com/article/17/8/enterprise-open-source-advantages"},
        {"label":"Homework", "type":"button assignmentbutton", "href":"supplement/open-source/assignment.html"},
        {"label":"Homework", "type":"button solutionbutton", "href":"supplement/open-source/solution-fxvup.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 5", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 7",
  "topics":[
    {"date":"October 9, 2017", "title":"Software: Operating Systems",
      "summary":"<p>The operating system is the most fundamental software in an information system, and this lecture provides an explanation of what an operating system is, as well as a brief history of the most prominent enterprise-grade operating systems. (Hint: Microsoft Windows and Apple macOS are not on the list.) I also provide a video tutorial of the operating system that you will use in this course. I encourage you to watch the tutorial before attempting the homework assignment.</p><p>In order to avoid having anything due during Fall Break, the homework and practice set milestone will be due on Friday of this week, instead of Saturday. Additionally, no puzzle will be due for the next two weeks.</p>",
      "nav":[
        {"label":"Lecture", "type":"button", "href":"lectures/operating-systems.html"},
        {"label":"Article", "type":"button", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
        {"label":"Homework", "type":"button", "href":"supplement/operating-systems/assignment.html"},
        {"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=zbsl0yS8zdE"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Homework", "deadline":"4"},
        {"deliverable":"Milestone 6", "deadline":"4"}
      ]
    }
  ]
  },
  {"week":"Week 8",
  "topics":[
    {"date":"October 18, 2017", "title":"Storage",
      "summary":"<p>This lecture covers the Storage block of the arch. We have not yet finished our discussion of the Software block because we still need to cover data analytics, but knowledge of storage and services is a prerequisite for understanding analytics.</p>",
      "nav":[
        {"label":"Lecture", "type":"button", "href":"lectures/storage.html"},
        {"label":"Article", "type":"button", "href":"supplement/storage/storage.png", "filetype":"Image"},
        {"label":"Homework", "type":"button", "href":"supplement/storage/assignment.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Homework", "deadline":"3"},
        {"deliverable":"Milestone 7", "deadline":"3"}
      ]
    }
  ]
  },
  {"week":"Week 9",
  "topics":[
    {"date":"October 23, 2017", "title":"Services",
      "summary":"<p>Services is the fourth block in the Technology section of the accounting architecture framework. This lecture places the other previously discussed technologies in the context of cloud computing, which is a crucial part of enterprise-grade computing.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/logic-problem.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/logic-problem-solution-ziwfu.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/services.html"},
        {"label":"Article", "type":"button", "href":"supplement/services/erp.pdf", "filetype":"PDF"},
        {"label":"Homework", "type":"button", "href":"supplement/services/assignment.html"},
        {"label":"HTML File", "type":"button", "href":"supplement/services/index.html"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 8", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 10",
  "topics":[
    {"date":"October 30, 2017", "title":"Software: Data Analytics",
      "summary":"<p>The final Software and Technology topic is data analytics. Data analytics is a huge issue in the business and accounting world today, and employers view it as a vital skill. The lecture introduces multiple analytical tools and programming languages, but the homework assignment will only focus on one: SQL. I will provide a video tutorial demonstrating how to use MySQL&mdash;a popular open source RDBMS&mdash;to import a database and run SQL queries to analyze data in that database. I recommend that you view the tutorial before you attempt the homework assignment.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/checkmate.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/checkmate-solution-unbfz.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/data-analytics.html"},
        {"label":"Article", "type":"button", "href":"supplement/data-analytics/analytics-and-auditing.pdf", "filetype":"PDF"},
        {"label":"Homework", "type":"button assignmentbutton", "href":"supplement/data-analytics/assignment.html"},
        {"label":"Homework", "type":"button solutionbutton", "href":"supplement/data-analytics/solution-vsfnj.html"},
        {"label":"Database", "type":"button", "href":"https://www.dropbox.com/s/r5ziqedm5wd3erm/company.sql?dl=1", "filetype":"SQL plain-text file"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 9", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 11",
  "topics":[
    {"date":"November 6, 2017", "title":"Risk &amp; Control",
      "summary":"<p>Control is the final section of the accounting architecture framework. The lecture begins with a discussion of risk, which is the final block in the Environment section, and then introduces internal controls, which protect against risk. Over the past decade, control has become a central focus of the accounting profession.</p><p>This week will have no homework assignment because of the midterm exam. You may begin the exam at any time during the week prior to the deadline, but you must complete the exam in one sitting. The exam is on eCourseware. I will not reopen or extend the exam <em>for any reason</em>. The exam is open-note, open-lecture, and open-article. That is to say, you may use any notes that you have written during the semester, and you may reference the lecture slides and articles. You may not use any other resource, and you may not discuss the exam questions or answers with any other individual at any point until after the exam has closed.</p><p>This week is also the deadline for the final practice set milestone and the final deadline for the practice set. You should submit any unfinished practice set modules by this week's deadline.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/math-facts.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/math-facts-solution-pnnvr.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/risk-and-control.html"},
        {"label":"Article", "type":"button", "href":"supplement/risk-and-control/coso.pdf", "filetype":"PDF"},
        {"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Final Milestone", "deadline":"5"},
        {"deliverable":"Midterm Exam", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 12",
  "topics":[
    {"date":"November 13, 2017", "title":"Security",
      "summary":"<p>Security is the first block of the Control section of the accounting architecture framework. The recent surge in cyber attacks and malicious software has made security a primary focus for all systems designers and maintainers.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/gauss.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/gauss-solution-azqhi.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/security.html"},
        {"label":"Article", "type":"button", "href":"https://enterprisersproject.com/article/2017/3/it-security-start-3-ways-make-it-business-priority"},
        {"label":"Homework", "type":"button", "href":"supplement/security/assignment.html"},
        {"label":"HW Article", "type":"button", "href":"supplement/security/acch-51065.pdf", "filetype":"PDF"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 13",
  "topics":[
    {"date":"November 20, 2017", "title":"Availability",
      "summary":"<p>Availability is the second Control block. The concepts in this lecture tie into the Services block because availability most frequently applies to cloud computing. I provide a video tutorial that demonstrates how to complete this week's homework assignment. No puzzle will be due this week because of Thanksgiving Break, but the homework assignment is due on Wednesday, instead of Saturday.</p>",
      "nav":[
        {"label":"Lecture", "type":"button", "href":"lectures/availability.html"},
        {"label":"Article", "type":"button", "href":"https://enterprisersproject.com/article/2017/3/sas-cio-be-proactive-leading-your-organization-sensor-enabled-world"},
        {"label":"Homework", "type":"button", "href":"supplement/availability/assignment.html"},
        {"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=G6iAfW2Dq5M"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Homework", "deadline":"2"}
      ]
    }
  ]
  },
  {"week":"Week 14",
  "topics":[
    {"date":"November 27, 2017", "title":"Processing Integrity",
      "summary":"<p>Processing Integrity is the third Control block. This lecture especially relates to the Storage block because processing integrity addresses error prevention in data stores, especially relational databases. This week's video tutorial showcases the online, open source diagramming tool that I used to create the activity and structure diagrams for this course, but you are not required to use this particular tool to complete the homework assignment. Also, this week's puzzle will be the final puzzle of the semester.</p>",
      "nav":[
        {"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/learning-curve.html"},
        {"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/learning-curve-solution-wjsku.html"},
        {"label":"Lecture", "type":"button", "href":"lectures/processing-integrity.html"},
        {"label":"Article", "type":"button", "href":"http://www.jamesserra.com/archive/2015/08/relational-databases-vs-non-relational-databases/"},
        {"label":"Homework", "type":"button assignmentbutton", "href":"supplement/processing-integrity/assignment.html"},
        {"label":"Homework", "type":"button solutionbutton", "href":"supplement/processing-integrity/solution-stvdt.html"},
        {"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=XyYS5N1hCtk"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 15",
  "topics":[
    {"date":"December 4, 2017", "title":"Confidentiality",
      "summary":"<p>Confidentiality is the final block of the Control section, and the final block of the accounting architecture framework. The concepts of this lecture explain some of the building blocks underlying the famous cryptocurrency Bitcoin, but they also apply heavily to everyday Internet traffic.</p><p>Please note the early deadline for this week's homework assignments because of the end of classes. The second, and final, homework assignment this week is very brief and will not interfere with the other bigger deliverables you may need to focus on from other courses.</p>",
      "nav":[
        {"label":"Lecture", "type":"button", "href":"lectures/confidentiality.html"},
        {"label":"Article", "type":"button", "href":"supplement/confidentiality/blockchain.pdf", "filetype":"PDF"},
        {"label":"Homework", "type":"button", "href":"supplement/confidentiality/assignment.html"},
        {"label":"Final Homework", "type":"button", "href":"supplement/final/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"0", "time":"12.40"},
        {"deliverable":"Homework", "deadline":"2"},
        {"deliverable":"Final Homework", "deadline":"2"}
      ]
    }
  ]
  },
  {"week":"Final",
  "topics":[
    {"date":"December 13, 2017", "title":"Final Exam",
      "summary":"<p>All students have until <strong>December 13 @ 12.00</strong> to complete the final exam and to submit evidence of your SETE for extra credit. You may begin the exam at any time during Finals Week prior to the deadline, but you must complete the exam in one sitting. The exam is on eCourseware, and eCourseware also reports the deadline for the exam. I will not reopen or extend the exam <em>for any reason</em>. The exam is open-note and open-lecture. That is to say, you may use any notes that you have written during the semester, and you may reference the lecture slides. You may not use any other resource, and you may not discuss the exam questions or answers with any other individual at any point until after the exam has closed.</p><p><strong>Good luck!</strong></p>",
      "nav":[
        {"label":"Extra Credit", "type":"button", "href":"supplement/final/SETE.html"},
      ],
      "due":[
        {"deliverable":"SETE", "deadline":"0"},
        {"deliverable":"Final Exam", "deadline":"0", "time":"12.00"}
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

