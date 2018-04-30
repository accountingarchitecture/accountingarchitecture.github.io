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
        if(isCurrentOrArchived(modules[i]) == 'current') topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title expand">' + modules[i].topics[j].title + '</h2><div class="summary">' + modules[i].topics[j].summary + '</div><div class="nav">' + navbuttons + '</div></div>';
        else topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="summary" style="display: none">' + modules[i].topics[j].summary + '</div><div class="nav" style="display: none">' + navbuttons + '</div></div>';
      }
      content += '<div class="module"><div class="week">' + modules[i].week + '</div>' + topic + '</div>';
    }
  }
  if(content == '' && isHomeOrArchive() == 'Home') content += '<div class="module"><div class="topic"><div class="date">' + Date() + '</div><h2>No current topics.</h2>' + '</div>';
  else if(content == '' && isHomeOrArchive() == 'Archive') content += '<div class="module"><div class="topic"><div class="date">' + Date() + '</div><h2>No archived topics.</h2>' + '</div>';
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
    {"date":"June 4, 2018", "title":"Getting Started",
      "summary":"<p>Welcome to ACCT 4020 &ndash; Accounting and Information Systems. To begin, carefully read the course syllabus. You will find a link to the syllabus in the navigation buttons below. The syllabus explains the course policies, objectives, and deliverables. The more carefully you read the syllabus, the better prepared you will be for the unique nature of the course. The other buttons listed below link to individual components of the syllabus that are required by the Fogelman College. After reading, you will find a syllabus quiz on eCourseware.</p><p>All current and future topics for this course are listed on the Home page on this course portal. Once a topic is no longer current, it will be moved to the Archive, where all past topics and deliverables will be stored for future reference. You can find the Archive by clicking on the link in the top-right corner of the page.</p>",
      "nav":[
        {"label":"Syllabus", "href":"supplement/getting-started/syllabus.html"},
        {"label":"Course Description", "href":"supplement/getting-started/syllabus.html#description"},
        {"label":"Instructor", "href":"supplement/getting-started/syllabus.html#instructor"},
        {"label":"Academic Integrity", "href":"supplement/getting-started/syllabus.html#integrity"},
        {"label":"Accessibility Assistance", "href":"supplement/getting-started/syllabus.html#accessibility"}
      ],
      "due":[
        {"deliverable":"Syllabus Quiz", "deadline":"1"}
      ]
    },
    {"date":"June 4, 2018", "title":"Practice Set",
      "summary":"<p>The practice set deliverable will test your understanding of financial accounting principles in a digital business environment. You will have one attempt at this assignment, and it is worth a substantial portion of your final grade. The reason for weighting this deliverable heavily is that it takes approximately 20 hours to complete, and I want the grade weighting to be commensurate with the amount of effort. The syllabus reports the due date for this assignment. <em>I will not change the due date for any reason</em>. In order to keep you on track with this assignment, I have set a number of intermediate milestones. Each milestone involves completing a portion of the practice set by a specific due date. The Milestones button links to an explanation of these milestones, and the course schedule reports the milestone due dates. Please note that some milestones involve completing more than one practice set module, so please review the milestones each week to verify which module(s) will be due.</p><p>The practice set introduction and supporting documentation provide all the information necessary in order to complete each practice set task successfully. The Quiz Instructions lists the supporting documentation that I mostly recommend. You should read this documentation and complete the practice set introduction and the practice set quiz before attempting the first milestone. I also provide a video tutorial as a walkthrough. You may watch as much or as little of the tutorial as you feel you need.</p><p>NB: Every semester students email me after attempting part of the practice set to complain that it is too hard or confusing. The reason for these emails is always, <strong>always</strong>, <strong>ALWAYS</strong> because the students have not read what I assigned. I urge you not to assume that you can succeed at this practice set without reading the supporting documentation.",
      "nav":[
        {"label":"Instructions", "href":"supplement/getting-started/syllabus.html#practiceset"},
        {"label":"Practice Set", "href":"http://www.perdisco.com/"},
        {"label":"Quiz Instructions", "href":"supplement/practice-set/quiz-instructions.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"},
        {"label":"Tutorial", "href":"https://www.youtube.com/watch?v=EBDM_m0_CQA"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"5"},
      ]
    },
    {"date":"June 4, 2018", "title":"Professionalism",
      "summary":"<p>Before we get into the technical content for this course, I would like first to talk about your future as a professional. This lecture focuses on the traits of a professional in the context of issues relevant to accountants. I hope that the lecture will inspire you as you prepare yourself for job interviews, internships, careers, and life. You should read the lecture and the article in preparation for the quiz. The schedule lists the quiz due date.</p><p>Professionalism will be important throughout this course. Although I will not require it, I invite students to dress professionally when coming to my office. Also, I will communicate with you in a professional manner, and I expect the same from you. The homework assignment will reinforce the practice of drafting professional emails, which is an important part of professional communication.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/professionalism.html"},
        {"label":"Article", "href":"supplement/professionalism/christensen.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/professionalism/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 2",
  "topics":[
    {"date":"June 11, 2018", "title":"Accounting Architecture",
        "summary":"<p>This topic marks the start of the core content of this course. Many of the terms in this lecture may be foreign to you. Some terms will be foreign because I invented them. For example, I coined the term &ldquo;accounting architecture&rdquo; to describe the design of an enterprise-grade information system from the perspective of an accountant. (As an aside: I frequently use the term &ldquo;enterprise-grade&rdquo; throughout this course to highlight the tools and protocols that a large corporation would use.) Accounting architecture is the focus of this course, and this lecture introduces the framework and the topics we will discuss for the remainder of the semester.</p><p>Because this topic is the first core topic of the semester, reading and understanding this and all remaining lectures and accompanying articles during the semester are not only preparation for the quizzes. They are also preparation for the midterm exams and final exam. As a result, you should carefully study each topic's lecture and article in order to score well on the quizzes and exams and acquire knowledge that will benefit you for your career.</p><p>Starting this week, I have added a puzzle designed to get your creative juices flowing. I will provide puzzles most weeks. They are completely optional, but I will give extra credit for each correct solution. The schedule reports the puzzle due dates. After each due date, you can find the correct puzzle solution under the Content section of eCourseware.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/robbers.html"},
        {"label":"Lecture", "href":"lectures/accounting-architecture.html"},
        {"label":"Article", "href":"supplement/accounting-architecture/pwc.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/accounting-architecture/assignment.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}

      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 1", "deadline":"5"}
      ]
    },
    {"date":"June 11, 2018", "title":"Business Model",
      "summary":"<p>The majority of the course will address the Information, Technology, and Control sections of the accounting architecture framework. With regards to the Environment section of the framework, Compliance is especially important for accountants, but this is primarily the focus of other accounting courses. However, a discussion of the other two Environment blocks, Business Model and Risk, is worthwhile to motivate and give context to the other sections of the arch. You will learn about Risk later in the course in connection with the Control section. We discuss Business Model at this point for two reasons. First, this foundational block highlights the informational needs of internal and external stakeholders. Second, diagrams are the primary tool for communicating the processes that make up the business model, and discussing a business model is a useful way to learn how to read and draw diagrams.</p><p>In addition to posting solutions for the puzzles and the analytics project, I provide solutions for a small number of homework assignments. Following the deadline for this homework, you will be able to find its solution on eCourseware under the Content section.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/business-model.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2015/8/aspire-be-technology-strategist-whatever-your-title-says"},
        {"label":"Homework", "href":"supplement/business-model/assignment.html"},
        {"label":"Diagram 1", "href":"supplement/business-model/payment-process.png", "filetype":"Image"},
        {"label":"Diagram 2", "href":"supplement/business-model/sales-order.png", "filetype":"Image"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 2", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 3",
  "topics":[
    {"date":"June 18, 2018", "title":"Information",
      "summary":"<p>The Information section of the accounting architecture model is the core competency of the information sciences discipline. As a result, my wife and co-author, Ms. Emily Coyne, who has a master's degree in information science, has crafted the lecture for this topic. This lecture will explain the role that an information system should play (i.e., what the system <em>does</em>).</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/coins.html"},
        {"label":"Lecture", "href":"lectures/information.html"},
        {"label":"Article", "href":"supplement/information/cpas-and-big-data.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/information/assignment.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 3", "deadline":"5"}
      ]
    },
    {"date":"June 18, 2018", "title":"Hardware",
      "summary":"<p>This is the first lecture on the Technology section of the accounting architecture framework. Although this is not the most interesting lecture of the course&mdash;I know that some of you would snicker and say that none of the lectures in this course are the <em>most</em> interesting&mdash;familiarity with computer hardware is an important first step toward understanding the design requirements of an information system.</p><p>The first exam will also be due this week. It will consist of similar questions to the quizzes, and it will cover the Accounting Architecture, Business Model, and Information topics. The exam is on eCourseware. I will not reopen or extend the exam <em>for any reason</em>. This is a timed, closed-book exam. You must complete the exam in one sitting, and you may not reference any resources while completing the exam. You may also not discuss the exam with any other individual until after the exam due date.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/hardware.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
        {"label":"Homework", "href":"supplement/hardware/assignment.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Exam 1", "deadline":"5"},
        {"deliverable":"Milestone 4", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 4/5",
  "topics":[
    {"date":"June 25, 2018", "title":"Software: Open Source",
      "summary":"<p>This lecture begins our discussion of the Software block of the arch. This first Software lecture introduces the most important concept in enterprise-grade software today: open source. However, because the term &ldquo;open&rdquo; applies to more than only software, the lecture introduces multiple aspects of openness that affect the design and implementation of corporate information systems. Openness also heavily influences the breadth of IT tools that we use for personal computing each and every day.</p><p>The homework assignment for this topic will help you to understand differences between open and closed content. You can find the solution to this homework under the Content section of eCoursware following the assignment due date.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/teasers.html"},
        {"label":"Lecture", "href":"lectures/open-source.html"},
        {"label":"Article", "href":"https://opensource.com/article/17/8/enterprise-open-source-advantages"},
        {"label":"Homework", "href":"supplement/open-source/assignment.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 5", "deadline":"5"}
      ]
    },
    {"date":"June 25, 2018", "title":"Software: Operating Systems",
      "summary":"<p>The second Software lecture introduces the most fundamental software in an information system: the operating system. This lecture provides an explanation of what an operating system is, as well as a brief history of the most prominent enterprise-grade operating systems.</p><p>In connection with this week's homework assignment, I have created a video tutorial explaining how to sign up for Codeanywhere, which provides access to the Linux operating system environment that you will use to complete multiple deliverables in this course. Watching the tutorial may make completing the homework assignment simpler.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/operating-systems.html"},
        {"label":"Article", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
        {"label":"Homework", "href":"supplement/operating-systems/assignment.html"},
        {"label":"Tutorial", "href":"https://www.youtube.com/watch?v=zbsl0yS8zdE"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"8"},
        {"deliverable":"Milestone 6", "deadline":"8"}
      ]
    }
  ]
  },
  {"week":"Week 6",
  "topics":[
    {"date":"July 9, 2018", "title":"Storage",
      "summary":"<p>This lecture covers the Storage block of the arch. Data storage is especially important for operationalizing the information and Big Data life cycles in order for raw data to transition successfully into retrievable, accurate information. The concepts in this lecture will arise again in the Control section of the accounting architecture framework, as well as the Data Analytics topic, and the homework assignment for this topic will provide valuable preparation for completing the Analytics project.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/logic-problem.html"},
        {"label":"Lecture", "href":"lectures/storage.html"},
        {"label":"Article", "href":"supplement/storage/storage.png", "filetype":"Image"},
        {"label":"Homework", "href":"supplement/storage/assignment.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 7", "deadline":"5"}
      ]
    },
    {"date":"July 9, 2018", "title":"Services",
      "summary":"<p>Services is the fourth block in the Technology section of the accounting architecture framework. This lecture places the other previously discussed technologies (Hardware, Software, and Storage) in the context of cloud computing, which is a crucial part of enterprise-grade computing.</p><p>I encourage you to begin working on this week's homework assignment early. The homework instructions explain how to complete the assignment, but some troubleshooting may be necessary. The earlier you begin, the more time you will have to troubleshoot any errors that may, and likely will, arise.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/services.html"},
        {"label":"Article", "href":"supplement/services/erp.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/services/assignment.html"},
        {"label":"HTML File", "href":"supplement/services/index.html"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Milestone 8", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 7",
  "topics":[
    {"date":"July 16, 2018", "title":"Risk &amp; Control",
      "summary":"<p>Control is the final section of the accounting architecture framework. This lecture begins with a discussion of Risk, which is the third block in the Environment section, and then introduces internal controls, which protect against risk. Over the past decade, Control has become a central focus of the accounting profession.</p><p>This topic has no homework assignment. Instead, you should use this time to study for and take Exam 2. The same rules apply to Exam 2 as applied to Exam 1, except that this exam will be longer because it covers Accounting Architecture, Business Model, Information, and Technology. The exam is on eCourseware. I will not reopen or extend the exam <em>for any reason</em>. This is a timed, closed-book exam. You must complete the exam in one sitting, and you may not reference any resources while completing the exam. You may also not discuss the exam with any other individual until after the exam due date.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/checkmate.html"},
        {"label":"Lecture", "href":"lectures/risk-and-control.html"},
        {"label":"Article", "href":"supplement/risk-and-control/coso.pdf", "filetype":"PDF"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Exam 2", "deadline":"5"},
        {"deliverable":"Milestone 9", "deadline":"5"}
      ]
    },
    {"date":"July 16, 2018", "title":"Security",
      "summary":"<p>Security is the first block of the Control section of the accounting architecture framework. The recent surge in cyber attacks and malicious software has made security a primary focus for all systems designers and maintainers, and businesses have increasingly viewed security as a responsibility shared by all employees, regardless of their title or job description.</p><p>You will have two articles to read this week. The first article is a supplement to the lecture, just as the articles for other topics are supplements to their respective lectures. The second article, labeled &lsquo;HW Article,&rsquo; is a research article about accounting data that you will need to read in order to complete the homework assignment.</p><p>This week also marks the final deadline for the practice set. All practice set modules must be complete by this week's deadline. I will not extend this deadline <em>for any reason</em>.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/security.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2017/3/it-security-start-3-ways-make-it-business-priority"},
        {"label":"Homework", "href":"supplement/security/assignment.html"},
        {"label":"HW Article", "href":"supplement/security/acch-51065.pdf", "filetype":"PDF"},
        {"label":"Milestones", "href":"supplement/practice-set/milestones.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Final Milestone", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 8",
  "topics":[
    {"date":"July 23, 2018", "title":"Availability",
      "summary":"<p>Availability is the second Control block. The concepts in this lecture tie into the Services block because availability most frequently applies to cloud computing.</p><p>I again advise you to begin the homework assignment early. The homework instructions provide multiple pages of step-by-step instructions, but troubleshooting may again be necessary. You will not need to submit anything to Dropbox for this assignment. Once it is complete, I will receive a notification automatically. However, you will only receive credit for this assignment if it is complete, and I receive a notification. I will not award partial credit for trying.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/math-facts.html"},
        {"label":"Lecture", "href":"lectures/availability.html"},
        {"label":"Article", "href":"https://enterprisersproject.com/article/2017/3/sas-cio-be-proactive-leading-your-organization-sensor-enabled-world"},
        {"label":"Homework", "href":"supplement/availability/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"}
      ]
    },
    {"date":"July 23, 2018", "title":"Processing Integrity",
      "summary":"<p>Processing Integrity is the third Control block. This lecture strongly relates to the Storage block because processing integrity addresses error prevention in data stores, especially relational databases.</p><p>This week's video tutorial showcases the online, open source diagramming tool that I used to create the activity and structure diagrams for this course. You may use this tool to complete the homework assignment, but you are not required to use it. However, you must use a software tool to complete the assignment. You should not submit a hand-drawn diagram because your diagram should look as professional as possible.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/processing-integrity.html"},
        {"label":"Article", "href":"http://www.jamesserra.com/archive/2015/08/relational-databases-vs-non-relational-databases/"},
        {"label":"Homework", "href":"supplement/processing-integrity/assignment.html"},
        {"label":"Tutorial", "href":"https://www.youtube.com/watch?v=XyYS5N1hCtk"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Homework", "deadline":"5"}
      ]
    }
  ]
  },
  {"week":"Week 9/10",
  "topics":[
    {"date":"July 30, 2018", "title":"Confidentiality",
      "summary":"<p>Confidentiality is the final block of the Control section, and the final block of the accounting architecture framework. The concepts of this lecture explain some of the building blocks underlying the famous cryptocurrency Bitcoin, but they also apply heavily to everyday Internet traffic.</p><p>This week is also the deadline for your tech reports. The Report Instructions button links to the syllabus instructions for this deliverable. I will not accept any late reports.</p>",
      "nav":[
        {"label":"Puzzle", "href":"supplement/puzzles/gauss.html"},
        {"label":"Lecture", "href":"lectures/confidentiality.html"},
        {"label":"Article", "href":"supplement/confidentiality/blockchain.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/confidentiality/assignment.html"},
        {"label":"Report Instructions", "href":"supplement/getting-started/syllabus.html#research"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"2"},
        {"deliverable":"Puzzle", "deadline":"5"},
        {"deliverable":"Homework", "deadline":"5"},
        {"deliverable":"Tech Report", "deadline":"5"}
      ]
    },
    {"date":"July 30, 2018", "title":"Data Analytics",
      "summary":"<p>The final topic of this course is data analytics. Data analytics is a huge issue in the business and accounting world today, and employers view it as a vital skill. Effective data analytics relies on an accurate understanding of all aspects of accounting architecture. The lecture introduces multiple analytical tools and programming languages, but the Analytics project focuses on one: SQL. The project instructions explain how to use MySQL&mdash;a popular open source RDBMS&mdash;to import a database and run SQL queries to analyze data in that database. You will need the Project, Database, and Dictionary files posted with this topic in order to complete the Analytics project. You can find the solution to this project under the Content section of eCourseware after the project due date. I will not accept any late project submissions.</p><p>Please note the deadlines for this week's deliverables because of the end of classes. Also, you must complete the Analytics project before completing this topic's homework assignment, as the homework assignment instructs you to delete your Codeanywhere account, which you will need for the Analytics project.</p>",
      "nav":[
        {"label":"Lecture", "href":"lectures/data-analytics.html"},
        {"label":"Article", "href":"supplement/data-analytics/analytics-and-auditing.pdf", "filetype":"PDF"},
        {"label":"Project", "href":"supplement/data-analytics/assignment.html"},
        {"label":"Database", "href":"https://www.dropbox.com/s/r5ziqedm5wd3erm/company.sql?dl=1", "filetype":"SQL plain-text file"},
        {"label":"Dictionary", "href":"supplement/data-analytics/data-dictionary.pdf", "filetype":"PDF"},
        {"label":"Homework", "href":"supplement/final/assignment.html"}
      ],
      "due":[
        {"deliverable":"Quiz", "deadline":"3"},
        {"deliverable":"Analytics Project", "deadline":"10"},
        {"deliverable":"Homework", "deadline":"10"}
      ]
    }
  ]
  },
  {"week":"Final",
  "topics":[
    {"date":"August 10, 2018", "title":"Final Exam",
      "summary":"<p>You have until <strong>August 10 @ 23.59</strong> to complete the final exam and to submit evidence of your SETE for extra credit. The exam is on eCourseware. I will not reopen or extend the exam <em>for any reason</em>. This is a timed, closed-book exam. You must complete the exam in one sitting, and you may not reference any resources while completing the exam. You may also not discuss the exam with any other individual until after the exam due date.</p><p><strong>Good luck!</strong></p>",
      "nav":[
        {"label":"Extra Credit", "href":"supplement/final/SETE.html"},
      ],
      "due":[
        {"deliverable":"SETE", "deadline":"0"},
        {"deliverable":"Final Exam", "deadline":"0"}
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
