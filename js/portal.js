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
	}
]

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
				if(isHomeOrArchive() == 'Home') topic += '<div class="topic"><div class="header"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title expand">' + modules[i].topics[j].title + '</h2><div class="summary">' + modules[i].topics[j].summary + '</div></div><div class="nav">' + navbuttons + '</div><div class="readings" style="display: none">' + readsets + '</div></div>';
				else topic += '<div class="topic"><div class="header"><div class="date">' + modules[i].topics[j].date + '</div><h2 class="title">' + modules[i].topics[j].title + '</h2><div class="summary" style="display: none">' + modules[i].topics[j].summary + '</div></div><div class="nav" style="display: none">' + navbuttons + '</div><div class="readings" style="display: none">' + readsets + '</div></div>';
			}
			content += '<div class="module"><div class="week">' + modules[i].week + '</div><div class="list">' + topic + '</div></div>';
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

// Build page on load
window.addEventListener('load', function(e) {
	builder(myModules);
});
