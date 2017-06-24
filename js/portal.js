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
								if(modules[i].topics[j].nav[k].hasOwnProperty('filetype')) navbuttons += 'href="' + modules[i].topics[j].nav[k].href + '" target="_blank" ref="noopener" aria-label="' + modules[i].topics[j].nav[k].filetype + ' opens in new window"';
								else navbuttons += 'href="' + modules[i].topics[j].nav[k].href + '" target="_blank" ref="noopener" aria-label="Website opens in new window"';
							}
							navbuttons += '>' + modules[i].topics[j].nav[k].label + '</a>';
						}
					}
					if(modules[i].topics[j].hasOwnProperty('readings')) {
						navbuttons += '<a class="button readingsbutton">Readings</a>';
						for(l = 0; l < modules[i].topics[j].readings.length; l++) {
							for(m = 0; m < modules[i].topics[j].readings[l].list.length; m++) {
								if(modules[i].topics[j].readings[l].list[m].hasOwnProperty('filetype')) readbuttons += '<a class="' + modules[i].topics[j].readings[l].list[m].type + '" href="' + modules[i].topics[j].readings[l].list[m].href + '" target="_blank" ref="noopener" aria-label="' + modules[i].topics[j].readings[l].list[m].filetype + ' opens in new window">' + modules[i].topics[j].readings[l].list[m].label + '</a>';
								else readbuttons += '<a class="' + modules[i].topics[j].readings[l].list[m].type + '" href="' + modules[i].topics[j].readings[l].list[m].href + '" target="_blank" aref="noopener" ria-label="Website opens in new window">' + modules[i].topics[j].readings[l].list[m].label + '</a>';
							}
							readsets += '<div class="set"><h3>' + modules[i].topics[j].readings[l].set + '</h3><div class="articles">' + readbuttons + '</div></div>';
							readbuttons = '';
						}
					}
				}
				if(isCurrentOrArchived(modules[i].topics[0]) == 'current') topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title expand">' + modules[i].topics[j].title + '</h2><div class="summary">' + modules[i].topics[j].summary + '</div><div class="nav">' + navbuttons + '</div><div class="readings" style="display: none">' + readsets + '</div></div>';
				else topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="summary" style="display: none">' + modules[i].topics[j].summary + '</div><div class="nav" style="display: none">' + navbuttons + '</div><div class="readings" style="display: none">' + readsets + '</div></div>';
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
					if(Date.parse(modules[i].topics[j].due[k].deadline) + 86400000 > currentDate) {
						deliverables += '<dd>' + modules[i].topics[j].due[k].deliverable + ' : ' + modules[i].topics[j].due[k].deadline.split(' ')[1] + ' ' + modules[i].topics[j].due[k].deadline.split(' ')[0] + '</dd>';
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
	if(topicDate.getDay() == 1 || topicDate.getDay() == 2 || topicDate.getDay() == 5) startDate = new Date(topicDate.valueOf() - 345600000);
	else if(topicDate.getDay() == 3 || topicDate.getDay() == 4) startDate = new Date(topicDate.valueOf() - 518400000);
	endDate = new Date(topicDate.valueOf() + (7 - topicDate.getDay()) * 86400000);
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
	try {
		topic.getElementsByClassName('nav')[0].style.display='';
	} catch(err) {
		// Catch TypeError when topic has no readings
	}
}

// How to hide topic content
function closeTopic(topic) {
	topic.getElementsByClassName('title')[0].className='title';
	topic.getElementsByClassName('summary')[0].style.display='none';
	try {
		topic.getElementsByClassName('nav')[0].style.display='none';
		topic.getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
		topic.getElementsByClassName('readings')[0].style.display='none';
	} catch(err) {
		// Catch TypeError when topic has no readings and/or puzzle
	}
}

// Show topic summary or readings list on click
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
	// Show readings list
	for(i = 0; i < topics.length; i++) {
		if(e.target == topics[i].getElementsByClassName('readingsbutton')[0] && topics[i].getElementsByClassName('readingsbutton')[0].className != 'button readingsbutton expand') {
			topics[i].getElementsByClassName('readingsbutton')[0].className='button readingsbutton expand';
			topics[i].getElementsByClassName('readings')[0].style.display='';
		} else if(e.target == topics[i].getElementsByClassName('readingsbutton')[0] && topics[i].getElementsByClassName('readingsbutton')[0].className == 'button readingsbutton expand') {
			topics[i].getElementsByClassName('readingsbutton')[0].className='button readingsbutton';
			topics[i].getElementsByClassName('readings')[0].style.display='none';
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
			"summary":"<p>Welcome to ACCT 4020 &ndash; Accounting and Information Systems. To begin, carefully read the course syllabus. You will find a link to the syllabus in the navigation buttons below. The syllabus explains the course policies, objectives, and deliverables. The syllabus also explains what this course <em>is</em> and what it <em>is not</em>. The more carefully you read the syllabus, the better prepared you will be for the unique nature of the course. The other buttons listed below link to individual components of the syllabus that are required by the Fogelman College. After reading, you will find a syllabus quiz on eCourseware.</p>" ,
			"nav":[
				{"label":"Syllabus", "type":"button", "href":"supplement/getting-started/syllabus.html"},
				{"label":"Course Description", "type":"button", "href":"supplement/getting-started/syllabus.html#description"},
				{"label":"Instructor", "type":"button", "href":"supplement/getting-started/syllabus.html#instructor"},
				{"label":"Academic Integrity", "type":"button", "href":"supplement/getting-started/syllabus.html#integrity"},
				{"label":"Accessibility Assistance", "type":"button", "href":"supplement/getting-started/syllabus.html#accessibility"}
			],
			"due":[
				{"deliverable":"Syllabus Quiz", "deadline":"31 May 2017"}
			]
		},
		{"date":"August 28, 2017", "title":"Practice Set",
			"summary":"<p>As the syllabus explains, it is customary for accounting students to complete a practice set. You will have one attempt at this assignment, and it is worth a substantial portion of your final grade. The reason for this is that it takes approximately 20 hours to complete, and I want the grade weighting to be commensurate with the amount of effort. The syllabus reports the due date for this assignment. <em>I will not change the due date for any reason</em>. In addition to the final deadline, to help you stay on track with this assignment, I have set a number of intermediate milestones. Each milestone involves completing a portion of the practice set. The Milestones button links to an explanation of these milestones, and the course schedule reports the milestone due dates. I will also upload a tutorial to the course portal to demonstrate the practice set. You may watch as much or as little of the tutorial as you feel you need.</p><p>NB: Every semester students email me after attempting part of the practice set to complain that it is too hard or confusing. The reason for these emails is always, <strong>always</strong>, <strong>ALWAYS</strong> because the students have not read what I assigned. I urge you not to assume that you can succeed at this practice set without reading the supporting documents.",
			"nav":[
				{"label":"Instructions", "type":"button", "href":"supplement/getting-started/syllabus.html#practiceset"},
				{"label":"Practice Set", "type":"button", "href":"http://www.perdisco.com/"},
				{"label":"Quiz Instructions", "type":"button", "href":"supplement/practice-set/quiz-instructions.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=EBDM_m0_CQA"},
				{"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"3 June 2017"},
			]
		},
		{"date":"August 30, 2017", "title":"Professionalism",
			"summary":"<p>Before we get into the technical content for this course, I would like first to talk about your future as a professional. This lecture focuses on the traits of a professional in the context of issues relevant to accountants. I hope that the lecture will inspire you as you prepare yourself for job interviews, internships, careers, and life. Students should read the lecture and the required readings in preparation for a quiz. The schedule lists the quiz due date. This format will be the norm for the remainder of the semester.</p><p>Professionalism will be important throughout this course. Although I will not require it, I invite students to dress professionally when coming to my office. Also, I will communicate with you in a professional manner, and I expect the same from you. The homework assignment will reinforce this practice. Furthermore, as the syllabus indicates, I will grade you based on your professionalism during the semester.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/professionalism.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/professionalism/assignment.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Measure Your Life", "type":"button", "href":"supplement/professionalism/christensen.pdf", "filetype":"PDF"}
				]},
				{"set":"Optional", "list":[
					{"label":"Diligence", "type":"button", "href":"http://www.theatlantic.com/magazine/archive/1978/03/writing-typing-and-economics/305165/"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"5 June 2017"},
				{"deliverable":"Homework", "deadline":"10 June 2017"}
			]
		}
	]
	},
	{"week":"Week 2",
	"topics":[
		{"date":"September 6, 2017", "title":"Accounting Architecture",
				"summary":"<p>This lecture marks the start of the core content of this course. Many of the terms in this lecture may be foreign to you. Some are foreign because I have invented the terms. For example, I coined the term &ldquo;accounting architecture&rdquo; to describe the design of an enterprise-grade information system from the perspective of an accountant. (As an aside: I frequently use the term &ldquo;enterprise-grade&rdquo; throughout this course to highlight the tools and protocols that a large corporation would use.) Accounting architecture is the foundation for this course, and this lecture introduces the framework and the topics we will discuss for the remainder of the semester.</p><p>Starting this week, I will include a puzzle each week. These are designed to get your creative juices flowing. They are completely optional, but I will give extra credit for each correct solution. Once the topic is archived, I will replace the puzzle with its solution.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/sudoku.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/sudoku-solution-wxkfp.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/accounting-architecture.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/accounting-architecture/assignment.html"},
				{"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Need for Change", "type":"button", "href":"http://www.ft.com/cms/s/2/bffcc032-a34d-11e5-8d70-42b68cfae6e4.html#axzz3x2IZba4Z"},
					{"label":"Change Proposal", "type":"button", "href":"supplement/accounting-architecture/pwc.pdf", "filetype":"PDF"},
					{"label":"Collaboration", "type":"button", "href":"https://opensource.com/open-organization/16/8/how-collaborative-should-i-be-during-strategic-planning"},
					{"label":"Be a Technologist", "type":"button", "href":"https://enterprisersproject.com/article/2015/8/aspire-be-technology-strategist-whatever-your-title-says"}
				]},
				{"set":"Optional", "list":[
					{"label":"Businesses Want Change", "type":"button", "href":"supplement/accounting-architecture/digitaltransformation.pdf", "filetype":"PDF"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"7 June 2017"},
				{"deliverable":"Puzzle", "deadline":"10 June 2017"},
				{"deliverable":"Homework", "deadline":"10 June 2017"},
				{"deliverable":"Milestone 1", "deadline":"10 June 2017"}
			]
		}
	]
	},
	{"week":"Week 3",
	"topics":[
		{"date":"September 11, 2017", "title":"Business Model",
			"summary":"<p>The majority of the course will address the Information, Technology, and Control sections of the accounting architecture model. Compliance is important, but this is primarily the topic of other accounting courses. However, a discussion of the other two Environment blocks, Business Model and Risk, is worthwhile to give context to the other sections of the arch. We discuss the Risk block later in connection with the Control section. We discuss Business Model at this point for two reasons. First, this foundational block highlights the informational needs of internal and external stakeholders. Second, diagrams are the primary tool for communicating the processes that make up the business model, and discussing these processes is a convenient way to learn how to read and draw diagrams.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/robbers.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/robbers-solution-uhxxx.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/business-model.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/business-model/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/business-model/solution-uhxep.html"},
				{"label":"Diagram", "type":"button", "href":"supplement/business-model/payment-process.png", "filetype":"Image"},
				{"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"Become a CIO", "type":"button", "href":"https://enterprisersproject.com/article/2016/11/should-cios-have-technology-background"},
					{"label":"Failure to Communicate", "type":"button", "href":"https://opensource.com/open-organization/16/12/failing-collaboration-game"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"12 June 2017"},
				{"deliverable":"Puzzle", "deadline":"17 June 2017"},
				{"deliverable":"Homework", "deadline":"17 June 2017"}			]
		}
	]
	},
	{"week":"Week 4",
	"topics":[
		{"date":"September 18, 2017", "title":"Information",
			"summary":"<p>The Information section of the accounting architecture model is the core competency of the information sciences discipline. As a result, I have asked my wife and co-author, Ms. Emily Coyne, who has a master's degree in information science to write the lecture for this topic. This lecture will explain the role that an information system should play (i.e., what the system <em>does</em>). Beginning next week, the Technology section will demonstrate the makeup of an information system (i.e., what the system <em>is</em>).</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"https://docs.google.com/presentation/d/13fG0U0H49izogaeotdDkZVxX9F4GT99FB3wK2kU9Big/pub?start=false&loop=false&delayms=0&slide=id.p"},
				{"label":"Assignment", "type":"button", "href":"supplement/information-life-cycle/assignment.html"},
				{"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"3 V's of Big Data", "type":"button", "href":"supplement/information-life-cycle/3d-data-management.pdf", "filetype":"PDF"},
					{"label":"Big Data for CPAs", "type":"button", "href":"http://ezproxy.memphis.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=buh&AN=99629685&site=eds-live"},
					{"label":"XBRL", "type":"button", "href":"http://www.xbrl.org/the-standard/what/an-introduction-to-xbrl/"}
				]},
				{"set":"Optional", "list":[
					{"label":"Forensics", "type":"button", "href":"supplement/information-life-cycle/forensics.pdf", "filetype":"PDF"},
					{"label":"Big Data Survey", "type":"button", "href":"supplement/information-life-cycle/big-data.pdf", "filetype":"PDF"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"14 June 2017"},
				{"deliverable":"Homework", "deadline":"17 June 2017"},
				{"deliverable":"Milestone 2", "deadline":"17 June 2017"}

			]
		}
	]
	},
	{"week":"Week 5",
	"topics":[
		{"date":"September 25, 2017", "title":"Hardware",
			"summary":"<p>This is the first lecture on the Technology section of the accounting architecture model. Although this is not the most interesting lecture of the course&mdash;I know that some of you would snicker and say that none of the lectures in this course were the <em>most</em> interesting&mdash;it introduces concepts that are valuable towards understanding the deeper points of systems design. As you read the lecture, I encourage you to think about the hardware in your own computing device, and you may find that these topics are quite close to home. I have not assigned homework for this topic, so you should consider investing additional time with the practice set.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/coins.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/coins-solution-umgqj.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/hardware.html"},
				{"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Raspberry Pi", "type":"button", "href":"http://www.zdnet.com/article/we-thought-wed-sell-1000-the-inside-story-of-the-raspberry-pi/"},
					{"label":"Chromebook", "type":"button", "href":"http://www.zdnet.com/article/how-to-pick-the-best-chromebook-for-school/"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"19 June 2017"},
				{"deliverable":"Puzzle", "deadline":"24 June 2017"}
			]
		}
	]
	},
	{"week":"Week 6",
	"topics":[
		{"date":"October 2, 2017", "title":"Open Source",
			"summary":"<p>This lecture begins our multi-week discussion of the Software block of the arch. This first lecture introduces the concepts behind open content as a precursor to subsequent introductions of the various components of the Software block. Please pay special attention to the required readings because open source is the primary force behind the development of enterprise-grade information systems.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/open-source.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/open-source/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/open-source/solution-fxvup.html"},
				{"label":"Milestones", "type":"button", "href":"supplement/practice-set/milestones.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Open Movement", "type":"button", "href":"https://opensource.com/open-organization/16/10/open-means-not-movement"},
					{"label":"Open Maker", "type":"button", "href":"https://opensource.com/life/16/11/maker-open-source-communities"},
					{"label":"Open Access", "type":"button", "href":"https://opensource.com/life/16/9/open-formats-academic-content"},
					{"label":"Open Source", "type":"button", "href":"http://opensource.org/faq"}
				]},
				{"set":"Optional", "list":[
					{"label":"Free Software", "type":"button", "href":"http://www.gnu.org/events/rms-nyu-2001-transcript.html"},
					{"label":"Open Source in 2016", "type":"button", "href":"supplement/open-source/2016-open-source-yearbook.pdf", "filetype":"PDF"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"21 June 2017"},
				{"deliverable":"Homework", "deadline":"24 June 2017"},
				{"deliverable":"Milestone 3", "deadline":"24 June 2017"}
			]
		}
	]
	},
	{"week":"Week 7",
	"topics":[
		{"date":"October 9, 2017", "title":"Operating Systems",
			"summary":"<p>This lecture will explain the fundamental parts of an operating system, as well as a brief historical overview of the operating systems most prominently used in enterprise-grade information systems. I will record and post a video tutorial demonstrating some functionality of the operating system we will use during this course. I encourage you to watch the tutorial before attempting the homework assignment.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/teasers.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/teasers-solution-qryjz.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/operating-systems.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=sqbXNK3rxK4"},
				{"label":"Assignment", "type":"button", "href":"supplement/operating-systems/assignment.html"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"History of GNU", "type":"button", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
					{"label":"25 Years of Linux", "type":"button", "href":"http://www.zdnet.com/pictures/the-25-biggest-events-in-linuxs-25-year-history/"},
					{"label":"Linux Commands", "type":"button", "href":"https://linuxjourney.com/lesson/the-shell"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"26 June 2017"},
				{"deliverable":"Puzzle", "deadline":"1 July 2017"},
				{"deliverable":"Homework", "deadline":"1 July 2017"}
			]
		}
	]
	},
	{"week":"Week 8",
	"topics":[
		{"date":"October 18, 2017", "title":"Storage",
			"summary":"<p>This week we begin our discussion of the Storage block of the Architecture. We have not yet finished our discussion of the Software block because we still need to cover data analytics, but knowledge of storage is a prerequisite for understanding analytics.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/storage.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/storage/assignment.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"NoSQL vs SQL", "type":"button", "href":"http://www.jamesserra.com/archive/2015/08/relational-databases-vs-non-relational-databases/"},
					{"label":"NoSQL and Big Data", "type":"button", "href":"http://www.bobsguide.com/guide/news/2014/Aug/13/big-data-new-approach.html"}
				]},
				{"set":"Optional", "list":[
					{"label":"History of Storage Devices", "type":"button", "href":"http://www.dailyinfographic.com/wp-content/uploads/2013/03/4b20d4ec68d60f454c722e64a8a40d34.jpg", "filetype":"Image"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"28 June 2017"},
				{"deliverable":"Homework", "deadline":"1 July 2017"},
				{"deliverable":"Milestone 4", "deadline":"1 July 2017"}
			]
		}
	]
	},
	{"week":"Week 9",
	"topics":[
		{"date":"October 23, 2017", "title":"Data Analytics",
			"summary":"<p>Now that we have discussed Storage, we can return to the Software block and discuss data analytics, a current hot topic. I will provide a video tutorial demonstrating how to use MySQL&mdash;a popular open source RDBMS&mdash;to import a database and run SQL queries to analyze data in that database. I have also attached a link to the database I use in the tutorial: Library DB. Please view the tutorial before you attempt this assignment, and please work through the entire assignment before opening the homework quiz associated with the assignment.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/logic-problem.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/logic-problem-solution-ziwfu.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/data-analytics.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=N418C3Po0sM"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/data-analytics/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/data-analytics/solution-vsfnj.html"},
				{"label":"Library DB", "type":"button", "href":"supplement/data-analytics/library.sql", "filetype":"SQL plain-text file"},
				{"label":"Company DB", "type":"button", "href":"supplement/data-analytics/company.sql", "filetype":"SQL plain-text file"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Analytics and Auditing", "type":"button", "href":"supplement/data-analytics/analytics-and-auditing.pdf", "filetype":"PDF"}
				]},
				{"set":"Optional", "list":[
					{"label":"Data and Loans, Part 1", "type":"button", "href":"https://enterprisersproject.com/article/2016/12/loan-company-realizes-power-data-scientists-and-software-engineers-joining-forces"},
					{"label":"Data and Loans, Part 2", "type":"button", "href":"https://enterprisersproject.com/article/2016/12/want-make-better-decisions-break-down-wall-between-data-and-it"},
					{"label":"MapReduce", "type":"button", "href":"https://www.youtube.com/watch?v=bcjSe0xCHbE"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"3 July 2017"},
				{"deliverable":"Puzzle", "deadline":"8 July 2017"},
				{"deliverable":"Homework", "deadline":"8 July 2017"},
				{"deliverable":"Milestone 5", "deadline":"8 July 2017"}
			]
		}
	]
	},
	{"week":"Week 10",
	"topics":[
		{"date":"October 30, 2017", "title":"Services",
			"summary":"<p>Services is the final block in the Technology leg of the accounting architecture. This lecture places the other previously discussed technologies in the context of cloud computing, which is a crucial part of today's computing environment. I will also provide a video tutorial that explains how to complete the homework assignment. Also, the final practice set deadline is this week. You should have already completed all five milestones, and this week you should complete the remaining modules after milestone 5.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/checkmate.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/checkmate-solution-unbfz.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/services.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=lr5pYsjR_rk"},
				{"label":"Assignment", "type":"button", "href":"supplement/services/assignment.html"},
				{"label":"HTML File", "type":"button", "href":"supplement/services/index.zip"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"Public Cloud", "type":"button", "href":"https://www.youtube.com/watch?v=jOhbTAU4OPI"},
					{"label":"History of ERP", "type":"button", "href":"supplement/services/erp-history.jpg", "filetype":"Image"},
					{"label":"Super Pi", "type":"button", "href":"http://www.zdnet.com/article/build-your-own-supercomputer-out-of-raspberry-pi-boards/"},
					{"label":"Mobility as a Service", "type":"button", "href":"https://opensource.com/business/16/9/travelspirit-mobility-service"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"10 July 2017"},
				{"deliverable":"Puzzle", "deadline":"15 July 2017"},
				{"deliverable":"Homework", "deadline":"15 July 2017"},
				{"deliverable":"Practice Set", "deadline":"15 July 2017"}
			]
		}
	]
	},
	{"week":"Week 11",
	"topics":[
		{"date":"November 6, 2017", "title":"Risk &amp; Control",
			"summary":"<p>Security is the first block of the Control section of the Architecture. This section of the course will especially appeal to the students who have had difficulty recognizing the link between accounting and the lectures up to this point. Unlike the prior content, which is based on my own model of accounting architecture, the Control section is based on the AICPA Trust Services Framework, so the AICPA agrees that this knowledge is relevant to accountants. Similarly, the homework assignment for this topic is particularly relevant to accountants, especially in their role as information custodians.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/math-facts.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/math-facts-solution-pnnvr.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/risk-and-control.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/security/assignment.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Population Data", "type":"button", "href":"supplement/security/acch-51065.pdf", "filetype":"PDF"},
					{"label":"Everyone's Problem", "type":"button", "href":"https://enterprisersproject.com/article/2016/3/it-shouldnt-be-shouldering-burden-security-alone"}
				]},
				{"set":"Optional", "list":[
					{"label":"Breaches", "type":"button", "href":"http://www.esecurityplanet.com/network-security/76-percent-of-organizations-breached-in-2014.html"},
					{"label":"Passphrases", "type":"button", "href":"http://www.esecurityplanet.com/hackers/why-longer-passphrases-are-more-secure-than-passwords-video.html"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"17 July 2017"},
				{"deliverable":"Puzzle", "deadline":"22 July 2017"},
				{"deliverable":"Homework", "deadline":"22 July 2017"}
			]
		}
	]
	},
	{"week":"Week 12",
	"topics":[
		{"date":"November 13, 2017", "title":"Security",
			"summary":"<p>Security is the first block of the Control section of the Architecture. This section of the course will especially appeal to the students who have had difficulty recognizing the link between accounting and the lectures up to this point. Unlike the prior content, which is based on my own model of accounting architecture, the Control section is based on the AICPA Trust Services Framework, so the AICPA agrees that this knowledge is relevant to accountants. Similarly, the homework assignment for this topic is particularly relevant to accountants, especially in their role as information custodians.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/math-facts.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/math-facts-solution-pnnvr.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/security.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/security/assignment.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Population Data", "type":"button", "href":"supplement/security/acch-51065.pdf", "filetype":"PDF"},
					{"label":"Everyone's Problem", "type":"button", "href":"https://enterprisersproject.com/article/2016/3/it-shouldnt-be-shouldering-burden-security-alone"}
				]},
				{"set":"Optional", "list":[
					{"label":"Breaches", "type":"button", "href":"http://www.esecurityplanet.com/network-security/76-percent-of-organizations-breached-in-2014.html"},
					{"label":"Passphrases", "type":"button", "href":"http://www.esecurityplanet.com/hackers/why-longer-passphrases-are-more-secure-than-passwords-video.html"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"17 July 2017"},
				{"deliverable":"Puzzle", "deadline":"22 July 2017"},
				{"deliverable":"Homework", "deadline":"22 July 2017"}
			]
		}
	]
	},
	{"week":"Week 13",
	"topics":[
		{"date":"November 20, 2017", "title":"Availability",
			"summary":"<p>Availability is the second Control block. This lecture ties significantly into the Services lecture because the principles of this lecture often deal with the availability of online (i.e., cloud) systems. I will also provide a video tutorial explaining how to complete the homework assignment.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/availability.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=G6iAfW2Dq5M"},
				{"label":"Assignment", "type":"button", "href":"supplement/availability/assignment.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Cyber Warfare", "type":"button", "href":"https://fossbytes.com/dos-and-ddos-attacks-the-origin-of-a-species/"}
				]},
				{"set":"Optional", "list":[
					{"label":"Learn Git", "type":"button", "href":"https://www.codeschool.com/courses/try-git"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"19 July 2017"},
				{"deliverable":"Homework", "deadline":"22 July 2017"}
			]
		}
	]
	},
	{"week":"Week 14",
	"topics":[
		{"date":"November 27, 2017", "title":"Processing Integrity",
			"summary":"<p>Processing Integrity is the third Control block. This lecture relates to the Storage lecture because it addresses tools that verify error prevention in stored data, especially relational databases. I will provide a video tutorial that showcases a diagramming tool, but you are not required to use this particular tool to complete the homework assignment. Also, this week's puzzle will be the final puzzle of the semester.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/gauss.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/gauss-solution-azqhi.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/processing-integrity.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=XyYS5N1hCtk"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/processing-integrity/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/processing-integrity/solution-stvdt.html"}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"24 July 2017"},
				{"deliverable":"Puzzle", "deadline":"29 July 2017"},
				{"deliverable":"Homework", "deadline":"29 July 2017"}
			]
		}
	]
	},
	{"week":"Week 15",
	"topics":[
		{"date":"December 4, 2017", "title":"Confidentiality",
			"summary":"<p>Confidentiality, with its related topic of privacy, is the final block of the Control section. The concepts of this lecture explain some of the building blocks underlying the famous cryptocurrency Bitcoin, but they also apply heavily to everyday Internet traffic. Please note the early deadline for this week's homework assignments because of the end of classes. The second, and final, homework assignment this week is very brief and will not interfere with the other bigger assignments due this week, especially the Technology Report.",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/confidentiality.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/confidentiality/assignment.html"},
				{"label":"Final Assignment", "type":"button assignmentbutton", "href":"supplement/final/assignment.html"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Auditing Big Data", "type":"button", "href":"supplement/confidentiality/acch-51070.pdf", "filetype":"PDF"}
				]}
			],
			"due":[
				{"deliverable":"Quiz", "deadline":"31 July 2017"},
				{"deliverable":"Homework", "deadline":"3 August 2017"},
				{"deliverable":"Final Homework", "deadline":"3 August 2017"},
				{"deliverable":"Technology Report", "deadline":"3 August 2017"}
			]
		}
	]
	},
	{"week":"Final",
	"topics":[
		{"date":"August 4, 2017", "title":"Final Exam",
			"summary":"<p>All students have until <strong>August 4 @ 23.59</strong> to complete the final exam and to submit evidence of your SETE for extra credit. You may begin the exam at any time during Finals Week prior to the deadline, but you must complete the exam in one sitting. The exam is on eCourseware, and eCourseware also reports the deadline for the exam. I will not reopen or extend the exam <em>for any reason</em>.</p><p>The exam is open-note and open-lecture. That is to say, you may use any notes that you have written during the semester, and you may reference the lecture slides. You may not use any other resource, and you may not discuss the exam questions or answers with any other individual at any point until after the exam has closed.</p><p><strong>Good luck!</strong></p>",
			"nav":[
				{"label":"Extra Credit Instructions", "type":"button assignmentbutton", "href":"supplement/final/SETE.html"},
			],
			"due":[
				{"deliverable":"SETE", "deadline":"4 August 2017"},
				{"deliverable":"Final Exam", "deadline":"4 August 2017"}
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

