// Build HTML
function builder(modules) {
	document.getElementById("page").innerHTML = '';
	var content = '';
	for(i = modules.length - 1; i >= 0; i--) {
		var topic = '';
		if((isCurrentOrArchived(modules[i].topics[0]) == 'current' && isHomeOrArchive() == 'Home') || (isCurrentOrArchived(modules[i].topics[0]) == 'archived' && isHomeOrArchive() == 'Archive')) {
			for(j = 0; j < modules[i].topics.length; j++) {
				var navbuttons = '';
				var readsets = '';
				var readbuttons = '';
				if(modules[i].topics[j].hasOwnProperty('nav')) {
					for(k = 0; k < modules[i].topics[j].nav.length; k++) {
						if(!(~modules[i].topics[j].nav[k].type.indexOf('assignmentbutton') != 0 && isHomeOrArchive() == 'Archive') && !(~modules[i].topics[j].nav[k].type.indexOf('solutionbutton') != 0 && isHomeOrArchive() == 'Home')) {
							navbuttons += '<a class="' + modules[i].topics[j].nav[k].type + '" ';
							if(modules[i].topics[j].nav[k].hasOwnProperty('href')) navbuttons += 'href="' + modules[i].topics[j].nav[k].href + '" target="_blank"';
							navbuttons += '>' + modules[i].topics[j].nav[k].label + '</a>';
						}
					}
					if(modules[i].topics[j].hasOwnProperty('readings')) {
						for(l = 0; l < modules[i].topics[j].readings.length; l++) {
							for(m = 0; m < modules[i].topics[j].readings[l].list.length; m++) {
								readbuttons += '<a class="' + modules[i].topics[j].readings[l].list[m].type + '" href="' + modules[i].topics[j].readings[l].list[m].href + '" target="_blank">' + modules[i].topics[j].readings[l].list[m].label + '</a>';
							}
							readsets += '<div class="set"><h3>' + modules[i].topics[j].readings[l].set + '</h3><div class="articles">' + readbuttons + '</div></div>';
							readbuttons = '';
						}
					}
				}
				if(isHomeOrArchive() == 'Home') topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title expand">' + modules[i].topics[j].title + '</h2><div class="summary">' + modules[i].topics[j].summary + '</div><div class="nav">' + navbuttons + '</div><div class="readings" style="display: none">' + readsets + '</div></div>';
				else topic += '<div class="topic"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="summary" style="display: none">' + modules[i].topics[j].summary + '</div><div class="nav" style="display: none">' + navbuttons + '</div><div class="readings" style="display: none">' + readsets + '</div></div>';
			}
			content += '<div class="module"><div class="week">' + modules[i].week + '</div>' + topic + '</div>';
		}
	}
	document.getElementById('page').innerHTML = content;
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
	if(topicDate.getDay() == 1 || topicDate.getDay() == 2) startDate = new Date(topicDate.valueOf() - 345600000);
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
document.getElementById('page').addEventListener('click', function(e) {
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
	// Show readings list on click
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

// Content
var myModules = [
	{"week":"Week 1",
	"topics":[
		{"date":"August 22, 2016", "title":"Getting Started",
			"summary":"<p>Welcome to ACCT 4020 &ndash; Accounting and Information Systems. To begin, carefully read the course syllabus. You will find a link to the syllabus in the navigation buttons below. The syllabus explains the course policies, objectives, and deliverables. The syllabus also explains what this course <em>is</em> and what it <em>is not</em>. The more carefully you read the syllabus, the better prepared you will be for the (unexpectedly) unique nature of the course. After reading, you will find a syllabus quiz on eCourseware. The syllabus quiz is due <b>Tuesday, August 23 @ 23.59</b>. The other buttons listed below link to individual components of the syllabus that are required by the Fogelman College.</p>" ,
			"nav":[
				{"label":"Syllabus", "type":"button", "href":"syllabus"},
				{"label":"Course Description", "type":"button", "href":"syllabus/#description"},
				{"label":"Instructor", "type":"button", "href":"syllabus/#description"},
				{"label":"Academic Integrity", "type":"button", "href":"syllabus/#integrity"},
				{"label":"Accessibility Assistance", "type":"button", "href":"syllabus/#accessibility"}
			]
		},
		{"date":"August 24, 2016", "title":"Practice Set",
			"summary":"<p>As the syllabus explains, it is customary for accounting students to complete a practice set. You will have one attempt at this assignment, and it is worth a substantial portion of your final grade. The reason for this is that it takes approximately 20 hours to complete, and I wanted the grade weighting to be commensurate with the amount of effort. The syllabus reports the due date for this assignment. <em>I will not change the due date for any reason</em>.</p><p>In addition to the final deadline, to help you stay on track with this assignment, I have set a number of intermediate milestones. Each milestone involves completing a portion of the practice set. The first week's transactions is due <b>Saturday, September 3 @ 23.59</b>. Each of the next five weeks will have a milestone. In order to fulfill these milestone requirements, all you need to do is complete and submit the required practice set work. The practice set system generates weekly reports so that I can monitor your performance.</p><p>A number of tools explain the practice set and the milestones I have listed above. The first group of tools are provided by Perdisco, the company that hosts the practice set. After purchasing the practice set, do the following:</p><ol><li>Read the Student Companion &amp; Helpful Hints</li><li>Complete the introduction</li><li>Read the accounting policies and procedures</li><li>Read pages 5 through 51 of the Accounting Cycle Supplement</li></ol><p>After completing these four items and before proceeding with the practice set, you must take the Practice Set quiz on eCourseware. This quiz will verify that you have read these documents and understood how to complete the assignment. The quiz is due <b>Saturday, August 27 @ 25.59</b>. You should not wait to purchase the practice set and complete these initial steps.</p><p>I also provide a tutorial to demonstrate the practice set. I will give the tutorial in the live class, and afterwards, I will make it available on the course portal in the navigation buttons below. You may watch as much or as little of the tutorial as you feel you need.</p>",
			"nav":[
				{"label":"Instructions", "type":"button", "href":"syllabus/#practiceset"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=9mar5eMzabQ"},
				{"label":"Practice Set", "type":"button", "href":"http://www.perdisco.com/"}
			]
		}
	]
	},
	{"week":"Week 2",
	"topics":[
		{"date":"August 29, 2016", "title":"Professionalism",
			"summary":"<p>Before we get into the technical content for this course, I would like first to talk about your future as a professional. This lecture focuses on the traits of a professional in the context of issues relevant to accountants. I hope that the lecture will inspire you as you prepare yourself for job interviews, internships, careers, and life. I ask that the live students wear business professional attire to this lecture.</p><p>The live students should read the lecture and required readings before class and come prepared for a quiz and a discussion. The online students should read the lecture by the date of this topic (i.e., <b>Monday, August 29 @ 23.59</b>) and complete the lecture quiz on eCourseware on the topic date. The quiz will only be available on the topic date. This format will be the norm for the remainder of the semester.</p><p>One reason for holding this lecture at the beginning of the semester is to prepare students for Beta Alpha Psi's Meet the Firms event. This event will be <b>Friday, September 9 from 17.30 to 19.00</b> on the first floor of the Fogelman Classroom Building. This is an opportunity to network with your future employers. Please dress professionally&mdash;the lecture explains what constitutes professional dress&mdash; and bring copies of your resume.</p><p>Additionally, professionalism will be important throughout this course. All live students should dress professionally when presenting. In fact, although I will not require it, I invite students to consider dressing professionally whenever coming to class or to my office. Also, I will communicate with you in a professional manner, and I expect the same from you. The homework assignment will reinforce this practice. All students should submit this assignment to Dropbox by <b>Wednesday, August 31 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/professionalism.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/professionalism/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Measure Your Life", "type":"button", "href":"supplement/professionalism/christensen.pdf"}
				]},
				{"set":"Optional", "list":[
					{"label":"Diligence", "type":"button", "href":"http://www.theatlantic.com/magazine/archive/1978/03/writing-typing-and-economics/305165/"},
					{"label":"Enron", "type":"button", "href":"http://ezproxy.memphis.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=rgm&AN=504193370&site=eds-live"},
					{"label":"Worldcom", "type":"button", "href":"supplement/professionalism/worldcom.pdf"},
					{"label":"Barings Bank", "type":"button", "href":"http://ezproxy.memphis.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=buh&AN=9503077597&site=eds-live"},
					{"label":"Bernie Madoff", "type":"button", "href":"http://ezproxy.memphis.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=buh&AN=38711267&site=eds-live"},
					{"label":"Arthur Andersen", "type":"button", "href":"http://ezproxy.memphis.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=buh&AN=7079735&site=eds-live"}
				]}
			]
			},
			{"date":"August 31, 2016", "title":"Accounting Architecture",
				"summary":"<p>This lecture marks the start of the core content of this course. Many of the terms in this lecture may be foreign to you. Some are foreign because I have invented the terms. For example, I coined the term &ldquo;accounting architecture&rdquo; to describe the design of an enterprise-grade information system from the perspective of an accountant. (As an aside: I frequently use the term &ldquo;enterprise-grade&rdquo; throughout this course to highlight the tools and protocols that a large corporation would use.) Accounting architecture is the foundation for this course, and this lecture introduces the framework and the topics we will discuss for the remainder of the semester.</p><p>Starting this week, I will include a puzzle with each lecture. These are designed to get your creative juices flowing. They are completely optional, but I will give extra credit for each correct solution. I will create a Dropbox folder for each puzzle, and you can submit your solution in any format you wish (e.g., screenshot, scanned image, photo of a sheet of paper, etc.). However, if I cannot open the file, I will not grade it, so I would advise that you only upload image or PDF files. Each week puzzle solutions are due the Saturday following the topic date. For example, this solution is due <b>Saturday, September 3 @ 23.59</b>. Once the topic is archived, I will post the solution to the puzzle.</p><p>Students should also upload the homework assignment to Dropbox by <b>Saturday, September 3 @ 23.59</b>. As the lecture explains, the role of accountants is to communicate and collaborate. In addition to IT knowledge, this requires communication skills. As a result, the majority of the deliverables in this course will be memos and other writing assignments. I encourage you to invest the necessary time to allow these assignments to improve your writing skills, whatever level they may currently be.</p><p>Finally, remember that practice set transactions for week 1 are due by <b>Saturday, September 3 @ 23.59</b>. You may work ahead on the practice set, if you choose, but you should have completed at least the first week by this Saturday.</p>",
				"nav":[
					{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/sudoku.html"},
					{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/sudoku-solution.html"},
					{"label":"Lecture", "type":"button", "href":"lectures/accounting-architecture.html"},
					{"label":"Assignment", "type":"button", "href":"supplement/accounting-architecture/assignment.html"},
					{"label":"Readings", "type":"button readingsbutton"}
				],
				"readings":[
					{"set":"Required", "list":[
						{"label":"Need for Change", "type":"button", "href":"http://www.ft.com/cms/s/2/bffcc032-a34d-11e5-8d70-42b68cfae6e4.html#axzz3x2IZba4Z"},
						{"label":"Change Proposal", "type":"button", "href":"supplement/accounting-architecture/pwc.pdf"},
						{"label":"Collaboration", "type":"button", "href":"https://opensource.com/open-organization/16/8/how-collaborative-should-i-be-during-strategic-planning"},
						{"label":"Be a Technologist", "type":"button", "href":"https://enterprisersproject.com/article/2015/8/aspire-be-technology-strategist-whatever-your-title-says"}
					]},
					{"set":"Optional", "list":[
						{"label":"Businesses Want Change", "type":"button", "href":"supplement/accounting-architecture/digitaltransformation.pdf"},
					]}
				]
			}
		]
	},
	{"week":"Week 3",
	"topics":[
		{"date":"September 7, 2016", "title":"Business Processes",
			"summary":"<p>Because of Labor Day the only lecture for this week will be on Wednesday, instead of Monday. The majority of the course will address the Information, Technology, and Control sections of the accounting architecture model. Regulations (i.e., Compliance) are important, but these are the topics of other accounting courses, and Environment is a very broad concept that touches on several disciplines beyond the scope of this course. (In the future, I may add a lecture to this course that explains the Environment block of the arch.) However, it is worthwhile to discuss the Business Model block of the foundation, especially in the context of the primary tool used for communicating business processes (i.e., diagramming). Understanding this block will prepare you to learn about the information life cycle. This topic has no additional readings, but I will provide a video tutorial following the live lecture demonstrating a diagramming tool.</p><p>All students should submit the homework assignment for this topic to Dropbox by <b>Saturday, September 10 @ 23.59</b>. The practice set transactions for week 2 are also due by <b>Saturday, September 10 @ 23.59</b>.</p><p><b>For the live students</b>: The first day of presentations will be <b>Wednesday, September 14</b>, and for the remainder of the semester, unless I announce otherwise, each Wednesday will be presentation day.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/robbers.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/robbers-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/business-processes.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/business-processes/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/business-processes/solution.html"},
				{"label":"Diagram", "type":"button", "href":"supplement/business-processes/payment-process.png"}
			]
		}
	]
	},
	{"week":"Week 4",
	"topics":[
		{"date":"September 12, 2016", "title":"Information Life Cycle &amp; Big Data",
			"summary":"<p>The Information section of the accounting architecture model is the core competency of the information sciences discipline. As a result, I have asked my wife and co-author, Ms. Emily Coyne, who has a master's degree in information science to write the lecture for this topic. She will also give the lecture in the live section on the topic date.</p><p>All students should submit the homework assignment for this topic to Dropbox by <b>Saturday, September 17 @ 23.59</b>. The practice set transactions for week 3 are also due by <b>Saturday, September 17 @ 23.59</b>.</p><p>Also, I have uploaded the completed flowchart I began during the Draw.io tutorial. I apologize that the tutorial was not more thorough, but I will showcase this tool again later on in the semester.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/coins.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/coins-solution.html"},
				{"label":"Lecture", "type":"button", "href":"https://docs.google.com/presentation/d/13fG0U0H49izogaeotdDkZVxX9F4GT99FB3wK2kU9Big/pub?start=false&loop=false&delayms=0&slide=id.p"},
				{"label":"Assignment", "type":"button", "href":"supplement/information-life-cycle/assignment.html"},
				{"label":"Draw.io Flowchart", "type":"button", "href":"supplement/information-life-cycle/sales-order.png"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"3 V's of Big Data", "type":"button", "href":"supplement/information-life-cycle/3d-data-management.pdf"},
					{"label":"Big Data for CPAs", "type":"button", "href":"http://ezproxy.memphis.edu/login?url=http://search.ebscohost.com/login.aspx?direct=true&db=buh&AN=99629685&site=eds-live"},
					{"label":"XBRL", "type":"button", "href":"http://www.xbrl.org/the-standard/what/an-introduction-to-xbrl/"}
				]},
				{"set":"Optional", "list":[
					{"label":"Forensics", "type":"button", "href":"supplement/information-life-cycle/forensics.pdf"},
					{"label":"Big Data Survey", "type":"button", "href":"supplement/information-life-cycle/big-data.pdf"}
				]}
			]
		}
	]
	},
	{"week":"Week 5",
	"topics":[
		{"date":"September 19, 2016", "title":"Hardware",
			"summary":"<p>This is the first lecture on the Technology section of the accounting architecture model. Although this is not the most interesting lecture of the course&mdash;I know that some of you would snicker and say that none of the lectures in this course were the <em>most</em> interesting&mdash;it introduces concepts that are valuable towards understanding the deeper points of systems design. As you read the lecture, I encourage you to think about the hardware in your own computing device, and you may find that these topics are quite close to home.</p><p>You will not have a homework assignment from this topic, but the practice set transactions for week 4 and 5 are due by <b>Saturday, September 24 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/tangram.pdf"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/tangram-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/hardware.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Raspberry Pi", "type":"button", "href":"http://www.zdnet.com/article/we-thought-wed-sell-1000-the-inside-story-of-the-raspberry-pi/"},
					{"label":"Chromebook", "type":"button", "href":"http://www.zdnet.com/article/how-to-pick-the-best-chromebook-for-school/"}
				]}
			]
		}
	]
	},
	{"week":"Week 6",
	"topics":[
		{"date":"September 26, 2016", "title":"Open Source",
			"summary":"<p>This lecture begins our multi-week discussion of the Software block of the arch. This first lecture introduces the concepts behind open content as a precursor to subsequent introductions to various components of the Software block.</p><p>In addition to the lecture slides, this week we will also begin <i>The Open Organization</i> by reading the Foreword and Chapter 1. A quiz for these two sections is on eCourseware and is due <b>Saturday, October 1 @ 23.59</b>. I encourage you to read the lecture before you read <i>Open Organization</i> so that you will be better able to grasp the concepts.</p><p>Students should complete the homework quiz by <b>Saturday, October 1 @ 23.59</b>; the practice set end of month posting and bank reconciliation (Sections 7 and 8) are also due by <b>Saturday, October 1 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/teasers.pdf"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/teasers-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/open-source.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Open Source", "type":"button", "href":"http://opensource.org/faq"},
					{"label":"Open Access", "type":"button", "href":"https://opensource.com/life/16/9/open-formats-academic-content"}
				]},
				{"set":"Optional", "list":[
					{"label":"Free Software", "type":"button", "href":"http://www.gnu.org/events/rms-nyu-2001-transcript.html"},
					{"label":"Why Open Source?", "type":"button", "href":"https://opensource.com/open-organization/16/3/open-source-reveals-value-social-norms"},
					{"label":"How to Contribute", "type":"button", "href":"https://opensource.com/life/16/1/how-contribute-open-source-without-writing-single-line-code"}
				]}
			]
		}
	]
	},
	{"week":"Week 7",
	"topics":[
		{"date":"October 3, 2016", "title":"Operating Systems",
			"summary":"<p>This lecture will explain the fundamental parts of an operating system, as well as a brief historical overview of the operating systems most prominently used in enterprise-grade information systems. I will record a video tutorial during Monday's lecture demonstrating some basic commands for the operating system we will use during this course. Following the lecture, I will make the video available on the course portal.</p><p>In addition to the lecture quiz and <i>Open Organization</i> Appendix quiz&mdash;the appendix is the most relevant to the current topic&mdash;the homework assignment also includes a quiz. Because I wish to keep your Fall Break free of deadlines, the <i>Open Organization</i> and homework quizzes are due <b>Friday, October 7 @ 23.59</b>. All students should also upload the remaining homework deliverable (a screenshot) to Dropbox by <b>Friday, October 7 @ 23.59</b>. I encourage you to watch the tutorial before attempting the homework assignment. The final deadline for the practice set is also <b>Friday, October 7 @ 23.59</b>. Because of the short week, I have not posted any puzzles; they will return in two weeks.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/operating-systems.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=nazhhpbbJfU"},
				{"label":"Assignment", "type":"button", "href":"supplement/operating-systems/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"History of GNU", "type":"button", "href":"http://www.gnu.org/gnu/the-gnu-project.html"},
					{"label":"25 Years of Linux", "type":"button", "href":"http://www.zdnet.com/pictures/the-25-biggest-events-in-linuxs-25-year-history/"},
					{"label":"Linux Commands", "type":"button", "href":"https://linuxjourney.com/lesson/the-shell"}
				]}
			]
		}
	]
	},
	{"week":"Week 8",
	"topics":[
		{"date":"October 12, 2016", "title":"Storage",
			"summary":"<p>This week we begin our discussion of the Storage block of the Architecture. We have not yet finished our discussion of the Software block because we still need to cover data analytics, but knowledge of storage is a prerequisite for understanding analytics. Because of Fall Break, the lecture for this week will be on Wednesday, instead of Monday, so the live section will not have any student presentations this week. Additionally, I will give you a break this week from reading <i>Open Organization</i>. You're welcome.</p><p>However, you will have a homework assignment, and all students should submit the assignment to Dropbox by <b>Saturday, October 15 @ 23.59</b>. This assignment will take longer to complete, and I encourage all students not to wait until the last minute to begin.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/storage.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/storage/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"NoSQL vs SQL", "type":"button", "href":"http://www.jamesserra.com/archive/2015/08/relational-databases-vs-non-relational-databases/"},
					{"label":"NoSQL and Big Data", "type":"button", "href":"http://www.bobsguide.com/guide/news/2014/Aug/13/big-data-new-approach.html"}
				]},
				{"set":"Optional", "list":[
					{"label":"History of Storage Devices", "type":"button", "href":"http://www.dailyinfographic.com/wp-content/uploads/2013/03/4b20d4ec68d60f454c722e64a8a40d34.jpg"}
				]}
			]
		}
	]
	},
	{"week":"Week 9",
	"topics":[
		{"date":"October 17, 2016", "title":"Data Analytics",
			"summary":"<p>Now that we have discussed Storage, we can return to the Software block and discuss data analytics, a current hot topic. After the live lecture, I will provide a video tutorial demonstrating how to install MySQL&mdash;a popular open source RDBMS&mdash;how to import a database, and how to use SQL queries to analyze data in that database. I have also attached a link to the database I use in the tutorial: Library DB.</p><p>All students should submit the homework quiz by <b>Saturday, October 22 @ 23.59</b>. In order to complete this assignment, you will first need to follow the instructions in the tutorial to install MySQL and import a database. Please view the tutorial before you attempt this assignment, and please work through the entire assignment before beginning the quiz. Additionally, all students should complete the <i>Open Organization</i> Chapter 2 quiz by <b>Saturday, October 22 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/logic-problem.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/logic-problem-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/data-analytics.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=GVebaJvnVBw"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/data-analytics/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/data-analytics/solution.html"},
				{"label":"Library DB", "type":"button", "href":"supplement/data-analytics/library.sql"},
				{"label":"Company DB", "type":"button", "href":"supplement/data-analytics/company.sql"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Analytics and Auditing", "type":"button", "href":"supplement/data-analytics/analytics-and-auditing.pdf"}
				]},
				{"set":"Optional", "list":[
					{"label":"MapReduce", "type":"button", "href":"https://www.youtube.com/watch?v=bcjSe0xCHbE"}
				]}
			]
		}
	]
	},
	{"week":"Week 10",
	"topics":[
		{"date":"October 24, 2016", "title":"Services",
			"summary":"<p>Services is the final block in the Technology leg of the accounting architecture. This lecture places the other previously discussed technologies in the context of cloud computing. After the live lecture, I will also provide a video tutorial that explains how to complete the homework assignment. All students should upload the homework to Dropbox and complete the <i>Open Organization</i> Chapter 3 quiz by <b>Saturday, October 29 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/checkmate.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/checkmate-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/services.html"},
				{"label":"Tutorial", "type":"button", "href":"https://www.youtube.com/watch?v=yLttnOVYWZo"},
				{"label":"Assignment", "type":"button", "href":"supplement/services/assignment.html"},
				{"label":"HTML File", "type":"button", "href":"supplement/services/index.zip"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"Public Cloud", "type":"button", "href":"https://www.youtube.com/watch?v=jOhbTAU4OPI"},
					{"label":"History of ERP", "type":"button", "href":"supplement/services/erp-history.jpg"},
					{"label":"Super Pi", "type":"button", "href":"http://www.zdnet.com/article/build-your-own-supercomputer-out-of-raspberry-pi-boards/"},
					{"label":"Mobility as a Service", "type":"button", "href":"https://opensource.com/business/16/9/travelspirit-mobility-service"}
				]}
			]
		}
	]
	},
	{"week":"Week 11",
	"topics":[
		{"date":"October 31, 2016", "title":"Security",
			"summary":"<p>Security is the first block of the Control section of the Architecture. This section of the course will especially appeal to the students who have had difficulty recognizing the link between accounting and the lectures up to this point. Unlike the prior content, which is based on my own model of accounting architecture, the Control section is based on the AICPA Trust Services Framework, so the AICPA agrees that this knowledge is relevant to accountants. Similarly, the homework assignment for this topic is particularly relevant to accountants, especially in their role as information custodians. All students should submit their homework to Dropbox and also complete the <i>Open Organization</i> Chapter 4 quiz by <b>Saturday, November 5 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/math-facts.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/math-facts-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/security.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/security/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Everyone's Problem", "type":"button", "href":"https://enterprisersproject.com/article/2016/3/it-shouldnt-be-shouldering-burden-security-alone"}
				]},
				{"set":"Optional", "list":[
					{"label":"Breaches", "type":"button", "href":"http://www.esecurityplanet.com/network-security/76-percent-of-organizations-breached-in-2014.html"},
					{"label":"Passphrases", "type":"button", "href":"http://www.esecurityplanet.com/hackers/why-longer-passphrases-are-more-secure-than-passwords-video.html"}
				]}
			]
		}
	]
	},
	{"week":"Week 12",
	"topics":[
		{"date":"November 7, 2016", "title":"Availability",
			"summary":"<p>Availability is the second Control block. This lecture ties significantly into the Services lecture because the principles of this lecture often deal with the availability of online (i.e., cloud) systems. After the live lecture, I will also provide a video tutorial explaining how to complete the homework assignment. Students should initiate pull requests&mdash;this signifies that the assignment is complete&mdash;by <b>Saturday, November 12 @ 23.59</b>. Students should also complete the <i>Open Organization</i> Chapter 5 quiz by <b>Saturday, November 12 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/gauss.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/gauss-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/availability.html"},
				{"label":"Assignment", "type":"button", "href":"supplement/availability/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"Learn Git", "type":"button", "href":"https://www.codeschool.com/courses/try-git"}
				]}
			]
		}
	]
	},
	{"week":"Week 13",
	"topics":[
		{"date":"November 14, 2016", "title":"Processing Integrity",
			"summary":"<p>Processing Integrity is the third Control block. This lecture relates to the Storage lecture because it addresses tools that verify error prevention in stored data, especially relational databases. Students should submit the homework assignment to Dropbox by <b>Saturday, November 19 @ 23.59</b>. After the live lecture, I will provide a video tutorial that demonstrates how to use the diagramming tool that I introduced earlier to complete the homework assignment, but you are not required to use this particular tool. Students should also complete the <i>Open Organization</i> Chapter 6 quiz by <b>Saturday, November 19 @ 23.59</b>. Finally, this week's puzzle will be the last because the remaining weeks of the semester are short weeks surrounding Thanksgiving.</p>",
			"nav":[
				{"label":"Puzzle", "type":"button assignmentbutton", "href":"supplement/puzzles/learning-curve.html"},
				{"label":"Puzzle", "type":"button solutionbutton", "href":"supplement/puzzles/learning-curve-solution.html"},
				{"label":"Lecture", "type":"button", "href":"lectures/processing-integrity.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/processing-integrity/assignment.html"},
				{"label":"Assignment", "type":"button solutionbutton", "href":"supplement/processing-integrity/solution.html"}
			]
		}
	]
	},
	{"week":"Week 14",
	"topics":[
		{"date":"November 21, 2016", "title":"Confidentiality",
			"summary":"<p>Confidentiality, as well as the related topic of Privacy, is the final block of the Control section. The concepts of this lecture explain some of the building blocks underlying the famous cryptocurrency Bitcoin, but they also apply heavily to everyday Internet traffic. In order to keep the Thanksgiving Break free, students should submit the homework assignment to Dropbox by <b>Tuesday, November 22 @ 23.59</b>. No <i>Open Organization</i> reading will be due this week, but the online students should submit their Technology Reports to Dropbox by <b>Tuesday, November 22 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/confidentiality.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/confidentiality/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Required", "list":[
					{"label":"Auditing Big Data", "type":"button", "href":"supplement/confidentiality/acch-51070.pdf"}
				]}
			]
		}
	]
	},
	{"week":"Week 15",
	"topics":[
		{"date":"November 30, 2016", "title":"Information Governance",
			"summary":"<p>The final topic for the semester is Information Governance. This is a return to the concepts from the beginning of the semester to recast the role of accountants in the context of the accounting architecture, now that you understand what it is. The <i>Open Organization</i> Chapter 7 and Epilogue quiz is due <b>Wednesday, November 30 @ 23.59</b>, and you will also have a small homework assignment due <b>Thursday, December 1 @ 23.59</b>.</p>",
			"nav":[
				{"label":"Lecture", "type":"button", "href":"lectures/information-governance.html"},
				{"label":"Assignment", "type":"button assignmentbutton", "href":"supplement/information-governance/assignment.html"},
				{"label":"Readings", "type":"button readingsbutton"}
			],
			"readings":[
				{"set":"Optional", "list":[
					{"label":"DevOps", "type":"button", "href":"https://www.youtube.com/watch?v=_I94-tJlovg"}
				]}
			]
		}
	]
	},
	{"week":"Final",
	"topics":[
		{"date":"December 7, 2016", "title":"Final Exam",
			"summary":"<p>All students have until <b>Wednesday, December 7 @ 12.00</b> to complete the final exam. The exam is on eCourseware for the live and online students. You must complete the exam in one sitting, and you will have XX minutes once you have started to complete it.</p><p><b>Good luck!</b></p>"
		}
	]
	}
]

// Build page on load
window.addEventListener('load', function(e) {
	builder(myModules);
});

