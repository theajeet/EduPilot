
// import type { Flashcard, Habit, Course, ReadingLogEntry, Note, ScheduledItem, InteractiveVideo } from './types';

// const today = new Date();
// const todayStr = today.toISOString().split('T')[0];
// const tomorrow = new Date(today);
// tomorrow.setDate(today.getDate() + 1);
// const tomorrowStr = tomorrow.toISOString().split('T')[0];
// const yesterday = new Date(today);
// yesterday.setDate(today.getDate() - 1);
// const yesterdayStr =  yesterday.toISOString().split('T')[0];


// export const mockFlashcards: Flashcard[] = [
//   { id: '1', front: 'What is the capital of France?', back: 'Paris', deck: 'Geography', nextReviewDate: todayStr, intervalDays: 1 },
//   { id: '2', front: 'What is 2 + 2?', back: '4', deck: 'Math', nextReviewDate: yesterdayStr, intervalDays: 2 },
//   { id: '3', front: 'What is H₂O?', back: 'Water', deck: 'Chemistry', nextReviewDate: tomorrowStr, intervalDays: 1 },
//   { id: '4', front: 'Who wrote "Hamlet"?', back: 'William Shakespeare', deck: 'Literature', nextReviewDate: todayStr, intervalDays: 4 },
//   { id: '5', front: 'What is the main function of the mitochondria?', back: 'To generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.', deck: 'Biology', nextReviewDate: undefined, intervalDays: 1 }, // New card
// ];

// export const mockHabits: Habit[] = [
//   { id: '1', name: 'Read for 30 minutes', completed: true, completedDays: 3, targetDays: 5 },
//   { id: '2', name: 'Morning Jog (3km)', completed: false, completedDays: 1, targetDays: 3 },
//   { id: '3', name: 'Practice Spanish Duolingo', completed: true, completedDays: 5, targetDays: 7 },
//   { id: '4', name: 'Review Flashcards', completed: false, completedDays: 2, targetDays: 4 },
// ];

// export const mockCourses: Course[] = [
//   {
//     id: '1',
//     title: 'Introduction to JavaScript',
//     topic: 'Programming',
//     estimatedTime: '4 weeks',
//     description: 'Learn the fundamentals of JavaScript, the most popular programming language for web development.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'javascript programming'
//   },
//   {
//     id: '2',
//     title: 'Organic Chemistry Basics',
//     topic: 'Science',
//     estimatedTime: '6 weeks',
//     description: 'An introductory course to the fascinating world of organic chemistry, covering structures, reactions, and mechanisms.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'chemistry science'
//   },
//   {
//     id: '3',
//     title: 'World History: Ancient Civilizations',
//     topic: 'History',
//     estimatedTime: '8 weeks',
//     description: 'Explore the rise and fall of ancient civilizations from around the globe.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'history ancient'
//   },
//   {
//     id: '4',
//     title: 'Advanced Python Programming',
//     topic: 'Programming',
//     estimatedTime: '5 weeks',
//     description: 'Dive deeper into Python with advanced concepts like decorators, generators, and asynchronous programming.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'python programming'
//   },
//   {
//     id: '5',
//     title: 'Comprehensive Full Stack Web Development Bootcamp',
//     topic: 'Full Stack Development',
//     estimatedTime: '12 weeks', // > 50 hours
//     description: 'Master front-end and back-end technologies to build complete web applications. Covers HTML, CSS, JavaScript, React, Node.js, Express, databases, and deployment strategies.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'web development'
//   },
//   {
//     id: '6',
//     title: 'Data Structures & Algorithms in Python for Placements',
//     topic: 'Data Structures & Algorithms',
//     estimatedTime: '10 weeks', // > 50 hours
//     description: 'Master essential data structures and algorithms using Python, focusing on interview preparation for top tech companies. Includes problem-solving strategies and complexity analysis.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'python algorithms'
//   },
//   {
//     id: '7',
//     title: 'Data Structures & Algorithms in Java for Placements',
//     topic: 'Data Structures & Algorithms',
//     estimatedTime: '10 weeks', // > 50 hours
//     description: 'Conquer essential data structures and algorithms using Java, with a strong focus on preparing for technical interviews at leading tech companies. Covers core concepts, problem-solving techniques, and performance analysis.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'java algorithms'
//   },
//   {
//     id: '8',
//     title: 'Ultimate Placement Success Program',
//     topic: 'Career Development',
//     estimatedTime: '24 Weeks', // > 200 hours
//     description: 'A complete program designed to equip you with all the necessary technical and soft skills for landing your dream job. Covers advanced DSA, system design, behavioral interviews, resume building, mock interviews, and much more.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'career interview'
//   },
//   {
//     id: '9',
//     title: 'Comprehensive SQL for Data Analysis',
//     topic: 'Databases & SQL',
//     estimatedTime: '8 Weeks', // > 50 hours
//     description: 'Master SQL from the ground up. Learn to write complex queries, analyze data, and manage databases effectively. Covers DDL, DML, DQL, advanced joins, subqueries, window functions, and performance tuning.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'database sql'
//   },
//   {
//     id: '10',
//     title: 'Comprehensive Computer Networks',
//     topic: 'Computer Networks',
//     estimatedTime: '9 Weeks', // > 50 hours
//     description: 'Understand the fundamentals of computer networking, from protocols and architectures to security and troubleshooting. Covers TCP/IP, OSI model, routing, switching, wireless networks, and more.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'network computer'
//   },
//   {
//     id: '11',
//     title: 'Comprehensive Operating Systems',
//     topic: 'Operating Systems',
//     estimatedTime: '15 Weeks', // > 150 hours
//     description: 'Dive deep into the core concepts of operating systems. Learn about process management, memory management, file systems, concurrency, and distributed systems. Essential for system-level programming and understanding how computers work.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'kernel system'
//   },
//   {
//     id: '12',
//     title: 'Class 11 PCM (Physics, Chemistry, Mathematics)',
//     topic: 'Science & Math (Grade 11)',
//     estimatedTime: '40 Weeks', // > 500 hours
//     description: 'A comprehensive course covering the complete Class 11 syllabus for Physics, Chemistry, and Mathematics (PCM). Designed to build a strong foundation for competitive exams and higher education.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'textbook study'
//   },
//   {
//     id: '13',
//     title: 'Class 11 PCB (Physics, Chemistry, Biology)',
//     topic: 'Science (Grade 11)',
//     estimatedTime: '40 Weeks', // > 500 hours
//     description: 'A comprehensive course covering the complete Class 11 syllabus for Physics, Chemistry, and Biology (PCB). Tailored for students aiming for medical and biological science careers, building a strong foundation for competitive exams.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'microscope biology'
//   },
//   {
//     id: '14',
//     title: 'Class 12 PCM (Physics, Chemistry, Mathematics)',
//     topic: 'Science & Math (Grade 12)',
//     estimatedTime: '44 Weeks', // > 550 hours
//     description: 'A comprehensive course covering the complete Class 12 syllabus for Physics, Chemistry, and Mathematics (PCM). Focuses on board exam preparation and competitive entrance exams like JEE.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'education exam'
//   },
//   {
//     id: '15',
//     title: 'Class 12 PCB (Physics, Chemistry, Biology)',
//     topic: 'Science (Grade 12)',
//     estimatedTime: '44 Weeks', // > 500 hours
//     description: 'A comprehensive course covering the complete Class 12 syllabus for Physics, Chemistry, and Biology (PCB). Tailored for students aiming for medical and biological science careers, with a focus on board exams and competitive entrance exams like NEET.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'science medical'
//   },
//   {
//     id: '16',
//     title: 'Comprehensive Class 10 Curriculum',
//     topic: 'General Studies (Grade 10)',
//     estimatedTime: '40 Weeks', // > 500 hours
//     description: 'A full curriculum covering all major subjects for Class 10, including Mathematics, Science (Physics, Chemistry, Biology), Social Studies (History, Geography, Civics, Economics), and English. Designed for thorough understanding and board exam preparation.',
//     imageUrl: 'https://placehold.co/600x400.png',
//     dataAiHint: 'education school'
//   }
// ];

// export const mockReadingLog: ReadingLogEntry[] = [
//   { id: '1', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', status: 'Read', rating: 5, finishDate: '2023-05-15T00:00:00.000Z' },
//   { id: '2', title: 'Atomic Habits', author: 'James Clear', status: 'Reading', rating: 4 },
//   { id: '3', title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', status: 'To Read' },
//   { id: '4', title: 'Dune', author: 'Frank Herbert', status: 'Read', rating: 5, finishDate: '2022-11-20T00:00:00.000Z' },
//   { id: '5', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', status: 'On Hold', rating: 3 },
//   { id: '6', title: 'Physics Part I - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
//   { id: '7', title: 'Physics Part II - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
//   { id: '8', title: 'Chemistry Part I - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
//   { id: '9', title: 'Chemistry Part II - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
//   { id: '10', title: 'Mathematics Part I - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
//   { id: '11', title: 'Mathematics Part II - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
// ];

// export const mockNotes: Note[] = [
//   { id: '1', title: 'JavaScript Hoisting', content: '```javascript\nconsole.log(x);\nvar x = 5;\n// Outputs: undefined\n```\nHoisting is JavaScript\'s default behavior of moving declarations to the top.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
//   { id: '2', title: 'CSS Flexbox Guide', content: '## Flex Container Properties\n- `display: flex`\n- `flex-direction`\n- `justify-content`\n- `align-items`\n\n## Flex Item Properties\n- `flex-grow`\n- `flex-shrink`\n- `flex-basis`\n- `order`\n- `align-self`', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
// ];

// export const mockSchedule: ScheduledItem[] = [
//   { id: '1', title: 'JavaScript Lecture 1.1', startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 1)).toISOString(), type: 'lesson', color: 'hsl(var(--primary))' },
//   { id: '2', title: 'Study Group: Organic Chem', startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 2)).toISOString(), type: 'study', color: 'hsl(var(--accent))' },
//   { id: '3', title: 'Quiz: World History Ch. 3', startTime: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(new Date().getHours() + 0.5)).toISOString(), type: 'exam', color: 'hsl(var(--destructive))' },
// ];

// export const mockInteractiveVideos: InteractiveVideo[] = [
//   { id: 'movie-trailer-hindi-1', title: 'Pathaan | Official Trailer | Shah Rukh Khan | Deepika Padukone', youtubeId: 'vqu4z34wENw', category: 'movies', description: 'Official Hindi trailer of the movie Pathaan.'},
//   { id: 'movie-trailer-hindi-2', title: 'K.G.F Chapter 2 Trailer Hindi | Yash |Sanjay Dutt |Raveena', youtubeId: 'JKa05nyUmuQ', category: 'movies', description: 'Official Hindi trailer of K.G.F Chapter 2.'},
//   { id: 'movie-new-1', title: 'Hindi Movie Trailer/Clip 1', youtubeId: 'PVYjojY0_GY', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-2', title: 'Hindi Movie Trailer/Clip 2', youtubeId: '35YAXDG6M7I', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-3', title: 'Hindi Movie Trailer/Clip 3', youtubeId: 'O5iTrRukDq0', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-4', title: 'Hindi Movie Trailer/Clip 4', youtubeId: 'Ha6PHjcg3uA', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-5', title: 'Hindi Movie Trailer/Clip 5', youtubeId: 'gyOFdkWx7j0', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-6', title: 'Hindi Movie Trailer/Clip 6', youtubeId: 'jv7IahQx9tA', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-7', title: 'Hindi Movie Trailer/Clip 7', youtubeId: 'GW1CFj6dXsI', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-8', title: 'Hindi Movie Trailer/Clip 8', youtubeId: '6M191qGTZA4', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-9', title: 'Hindi Movie Trailer/Clip 9', youtubeId: 'QsWRoB2m7RM', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-10', title: 'Hindi Movie Trailer/Clip 10', youtubeId: 'vcsQc4UlJ9M', category: 'movies', description: 'A clip or trailer of a Hindi movie.'},
//   { id: 'movie-new-11', title: 'Hindi Movie Trailer/Clip 11', youtubeId: 'N5Gnj8voYko', category: 'movies', description: 'A clip or trailer of a Hindi movie.' },
//   { id: 'movie-new-12', title: 'Hindi Movie Trailer/Clip 12', youtubeId: 'rKOTE0C3Bhw', category: 'movies', description: 'A clip or trailer of a Hindi movie.' },
//   { id: 'movie-new-13', title: 'Hindi Movie Trailer/Clip 13', youtubeId: 'YssithSDYWA', category: 'movies', description: 'A clip or trailer of a Hindi movie.' },
//   { id: 'movie-new-14', title: 'Hindi Movie Trailer/Clip 14', youtubeId: 'svUy_5b60pw', category: 'movies', description: 'A clip or trailer of a Hindi movie.' },
//   { id: 'song-youtube-1', title: 'Dhunki | Mere Brother Ki Dulhan', youtubeId: '_wfrNbLguWw', category: 'songs', description: 'Full Song: Dhunki | Mere Brother Ki Dulhan | Katrina Kaif, Imran Khan | Neha Bhasin | Sohail Sen' },
//   { id: 'song-youtube-2', title: 'Dil Diyan Gallan | Tiger Zinda Hai', youtubeId: 't14j6XVGCSo', category: 'songs', description: 'Full Song: Dil Diyan Gallan | Tiger Zinda Hai | Salman Khan, Katrina Kaif | Atif Aslam' },
//   { id: 'song-youtube-3', title: 'Kalank Title Track', youtubeId: '5ZKLM5pNoGQ', category: 'songs', description: 'Kalank Title Track - Lyrical | Alia Bhatt, Varun Dhawan | Arijit Singh | Pritam| Amitabh' },
//   { id: 'song-youtube-4', title: 'Pachtaoge | Arijit Singh', youtubeId: 'b_l1IP_6psY', category: 'songs', description: 'JAANI TERA NAA | PACHTAOGE | Vicky Kaushal, Nora Fatehi | Arijit Singh, Jaani, B Praak' },
//   { id: 'song-youtube-5', title: 'Pal Pal Dil Ke Paas - Title Track', youtubeId: 'seEO3--Sy3c', category: 'songs', description: 'Pal Pal Dil Ke Paas - Title Track | Karan Deol, Sahher Bambba | Arijit Singh, Parampara Thakur' },
//   { id: 'song-youtube-6', title: 'Vaaste Song | Dhvani Bhanushali, Tanishk Bagchi', youtubeId: 'GUYg6TmOZmU', category: 'songs', description: 'Vaaste Song: Dhvani Bhanushali, Tanishk Bagchi | Nikhil D | Bhushan Kumar | Radhika Rao, Vinay Sapru' },
//   { id: 'song-youtube-7', title: 'Lehanga | Jass Manak', youtubeId: 'ApnrYpdBrco', category: 'songs', description: 'Lehanga : Jass Manak (Official Video) Satti Dhillon | Punjabi Song | GK DIGITAL | Geet MP3' },
//   { id: 'song-youtube-8', title: 'Filhall | Akshay Kumar Ft Nupur Sanon', youtubeId: 'vmO8sapyPh4', category: 'songs', description: 'Filhall | Akshay Kumar Ft Nupur Sanon | BPraak | Jaani | Arvindr Khaira | Ammy Virk | DESI MELODIES' },
//   { id: 'song-youtube-9', title: 'Lut Gaye | Jubin Nautiyal', youtubeId: '4N9Ej-JXq9c', category: 'songs', description: 'Gulshan Kumar & T-Series presents Bhushan Kumar\'s LUT GAYE (Full Song) Jubin Nautiyal, Emraan Hashmi' },
//   { id: 'song-youtube-10', title: 'Raataan Lambiyan | Shershaah', youtubeId: 'mMBjy8uGxVo', category: 'songs', description: 'Raataan Lambiyan – Official Video | Shershaah | Sidharth – Kiara | Tanishk B| Jubin N | Asees K' },
//   { id: 'song-youtube-11', title: 'Heeriye | Jasleen Royal ft Arijit Singh', youtubeId: 'ZZ86YrRjIOs', category: 'songs', description: 'Heeriye (Official Video) Jasleen Royal ft Arijit Singh | Dulquer Salmaan | Aditya Sharma | Taani Tanvir' },
//   { id: 'song-youtube-12', title: 'Chaleya | Jawan | Shah Rukh Khan', youtubeId: 'TFPesgueHCg', category: 'songs', description: 'Chaleya (Hindi) | Jawan | Shah Rukh Khan | Nayanthara | Atlee | Anirudh | Arijit S, Shilpa R | Kumaar' },
//   { id: 'song-youtube-13', title: 'Satranga | Animal | Ranbir Kapoor', youtubeId: 'afwruTBTILw', category: 'songs', description: 'Satranga (Song) Animal | Ranbir Kapoor, Rashmika | Sandeep V | Arijit Singh, Shreyas P, Siddharth G' },
//   { id: 'song-youtube-14', title: 'Kesariya | Brahmāstra | Ranbir Kapoor', youtubeId: 'Jx3hBQBIPd0', category: 'songs', description: 'Kesariya - Full Video| Brahmāstra | Ranbir Kapoor | Alia Bhatt | Pritam | Arijit Singh | Amitabh B' },
//   { id: 'song-youtube-15', title: 'Pehle Bhi Main | ANIMAL | Ranbir Kapoor', youtubeId: 'KGn-erOG-Bs', category: 'songs', description: 'ANIMAL: PEHLE BHI MAIN (Full Video) | Ranbir Kapoor, Tripti Dimri | Sandeep V | Vishal M, Raj S | Bhushan K' },
//   { id: 'funny-video-1', youtubeId: '0CKMoDDIFFk', title: 'Funny Video Clip 1', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-2', youtubeId: 'U_CEHOf3Wv8', title: 'Funny Video Clip 2', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-3', youtubeId: '2CT0SkSySEU', title: 'Funny Video Clip 3', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-4', youtubeId: 'A1BtCtep1t4', title: 'Funny Video Clip 4', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-5', youtubeId: 'GamaHhPc7ic', title: 'Funny Video Clip 5', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-6', youtubeId: '71SkYcEjk_4', title: 'Funny Video Clip 6', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-7', youtubeId: 'wav-Zog09Z4', title: 'Funny Video Clip 7', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-8', youtubeId: 'I60Z-6z1WM8', title: 'Funny Video Clip 8', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-9', youtubeId: '5fbm5GP_0Ds', title: 'Funny Video Clip 9', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-10', youtubeId: 'ApXtqtnfCxA', title: 'Funny Video Clip 10', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-11', youtubeId: 'q38QV-vx4Q8', title: 'Funny Video Clip 11', category: 'funny', description: 'A funny video clip.'},
//   { id: 'funny-video-12', youtubeId: 'sLvAmBuCEJA', title: 'Funny Video Clip 12', category: 'funny', description: 'A funny video clip.'},
//   { id: 'motivational-video-1', youtubeId: 'iThssoR2qJA', title: 'Motivational Video 1', category: 'motivational', description: 'An inspiring video.'},
//   { id: 'motivational-video-2', youtubeId: '7RZne_dfg84', title: 'Motivational Video 2', category: 'motivational', description: 'An inspiring video.'},
//   { id: 'motivational-video-3', youtubeId: 'aNUXlU5P4vg', title: 'Motivational Video 3', category: 'motivational', description: 'An inspiring video.'},
//   { id: 'motivational-video-4', youtubeId: 'uj8OKzIUM7Q', title: 'Motivational Video 4', category: 'motivational', description: 'An inspiring video.'},
//   { id: 'education-video-1', youtubeId: 'brZBO9GFyuk', title: 'Class 10th Science', category: 'education', description: 'A video lesson for Class 10th Science.'},
//   { id: 'education-video-2', youtubeId: '2N99sxUABqc', title: 'Class 10th Math', category: 'education', description: 'A video lesson for Class 10th Math.'},
//   { id: 'education-video-3', youtubeId: 'U_TVhyuaSjs', title: 'Class 12th Physics', category: 'education', description: 'A video lesson for Class 12th Physics.'},
//   { id: 'education-video-4', youtubeId: '2jI6fHacUNI', title: 'Class 12th Math', category: 'education', description: 'A video lesson for Class 12th Math.'},
//   { id: 'education-video-5', youtubeId: 'uecGX7siidA', title: 'Class 12th Chemistry', category: 'education', description: 'A video lesson for Class 12th Chemistry.'},
//   { id: 'education-video-6', youtubeId: '0hGFaKi7h0Y', title: 'Class 12th Biology', category: 'education', description: 'A video lesson for Class 12th Biology.'},
//   { id: 'education-video-7', youtubeId: 'acZpClySY8M', title: 'Class 11th Biology', category: 'education', description: 'A video lesson for Class 11th Biology.'},
//   { id: 'education-video-8', youtubeId: 'FSlOdXN7leo', title: 'Class 11th Physics', category: 'education', description: 'A video lesson for Class 11th Physics.'},
//   { id: 'education-video-9', youtubeId: 'DuPGMwYrkaQ', title: 'Class 11th Chemistry', category: 'education', description: 'A video lesson for Class 11th Chemistry.'},
//   { id: 'education-video-10', youtubeId: 'J8Obh-NyDV4', title: 'Class 11th Math', category: 'education', description: 'A video lesson for Class 11th Math.'},
//   {
//     id: 'education-playlist-1',
//     title: 'Python for Begineer to Advance in 100days',
//     youtubeId: 'PLu0W_9lII9agwh1XjRt242xIpHhPT2llg',
//     category: 'education',
//     description: 'A comprehensive Python tutorial playlist from CodeWithHarry.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-2',
//     title: 'Sigma Web Development Course - Web Development',
//     youtubeId: 'PLu0W_9lII9agq5TrH9XLIKQvv0iaF2X3w',
//     category: 'education',
//     description: 'A comprehensive Web Development course playlist from CodeWithHarry.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-3',
//     title: 'Java & DSA Course for Placement',
//     youtubeId: 'PLfqMhTWNBTe3LtFWcvwpqTkUSlB32kJop',
//     category: 'education',
//     description: 'A comprehensive Java and DSA course playlist from Apna College.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-4',
//     title: 'DSA using Python in Hindi',
//     youtubeId: 'PL7ersPsTyYt1HnCgrT6Up-pan4yLBpyFs',
//     category: 'education',
//     description: 'A comprehensive DSA using Python course playlist in Hindi.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-os',
//     title: 'OPERATING SYSTEM',
//     youtubeId: 'PLmXKhU9FNesSFvj6gASuWmQd23Ul5omtD',
//     category: 'education',
//     description: 'Operating System playlist by Gate Smashers.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-dbms',
//     title: 'DBMS',
//     youtubeId: 'PLDzeHZWIZsTpukecmA2p5rhHM14bl2dHU',
//     category: 'education',
//     description: 'Database Management System playlist by Love Babbar.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-cn',
//     title: 'Computer Networks',
//     youtubeId: 'PLBlnK6fEyqRgMCUAG0XRw78UA8qnv6jEx',
//     category: 'education',
//     description: 'Computer Networks playlist by Neso Academy.',
//     isPlaylist: true
//   },
//   {
//     id: 'education-playlist-system-design-hindi',
//     title: 'System Design Playlist in Hindi',
//     youtubeId: 'PLA3GkZPtsafZdyC5iucNM_uhqGJ5yFNUM',
//     category: 'education',
//     description: 'System Design playlist in Hindi by CodeHelp - by Babbar.',
//     isPlaylist: true
//   }
// ];



import type { Flashcard, Habit, Course, ReadingLogEntry, Note, ScheduledItem, InteractiveVideo } from './types';

const today = new Date();
const todayStr = today.toISOString().split('T')[0];
const tomorrow = new Date(today);
tomorrow.setDate(today.getDate() + 1);
const tomorrowStr = tomorrow.toISOString().split('T')[0];
const yesterday = new Date(today);
yesterday.setDate(today.getDate() - 1);
const yesterdayStr = yesterday.toISOString().split('T')[0];


export const mockFlashcards: Flashcard[] = [
  { id: '1', front: 'What is the capital of France?', back: 'Paris', deck: 'Geography', nextReviewDate: todayStr, intervalDays: 1 },
  { id: '2', front: 'What is 2 + 2?', back: '4', deck: 'Math', nextReviewDate: yesterdayStr, intervalDays: 2 },
  { id: '3', front: 'What is H₂O?', back: 'Water', deck: 'Chemistry', nextReviewDate: tomorrowStr, intervalDays: 1 },
  { id: '4', front: 'Who wrote "Hamlet"?', back: 'William Shakespeare', deck: 'Literature', nextReviewDate: todayStr, intervalDays: 4 },
  { id: '5', front: 'What is the main function of the mitochondria?', back: 'To generate most of the cell\'s supply of adenosine triphosphate (ATP), used as a source of chemical energy.', deck: 'Biology', nextReviewDate: undefined, intervalDays: 1 }, // New card
];

export const mockHabits: Habit[] = [
  { id: '1', name: 'Read for 30 minutes', completed: true, completedDays: 3, targetDays: 5 },
  { id: '2', name: 'Morning Jog (3km)', completed: false, completedDays: 1, targetDays: 3 },
  { id: '3', name: 'Practice Spanish Duolingo', completed: true, completedDays: 5, targetDays: 7 },
  { id: '4', name: 'Review Flashcards', completed: false, completedDays: 2, targetDays: 4 },
];

export const mockCourses: Course[] = [
  {
    id: '1',
    title: 'Introduction to JavaScript',
    topic: 'Programming',
    estimatedTime: '4 weeks',
    description: 'Learn the fundamentals of JavaScript, the most popular programming language for web development.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'javascript programming'
  },
  {
    id: '2',
    title: 'Organic Chemistry Basics',
    topic: 'Science',
    estimatedTime: '6 weeks',
    description: 'An introductory course to the fascinating world of organic chemistry, covering structures, reactions, and mechanisms.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'chemistry science'
  },
  {
    id: '3',
    title: 'World History: Ancient Civilizations',
    topic: 'History',
    estimatedTime: '8 weeks',
    description: 'Explore the rise and fall of ancient civilizations from around the globe.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'history ancient'
  },
  {
    id: '4',
    title: 'Advanced Python Programming',
    topic: 'Programming',
    estimatedTime: '5 weeks',
    description: 'Dive deeper into Python with advanced concepts like decorators, generators, and asynchronous programming.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'python programming'
  },
  {
    id: '5',
    title: 'Comprehensive Full Stack Web Development Bootcamp',
    topic: 'Full Stack Development',
    estimatedTime: '12 weeks', // > 50 hours
    description: 'Master front-end and back-end technologies to build complete web applications. Covers HTML, CSS, JavaScript, React, Node.js, Express, databases, and deployment strategies.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'web development'
  },
  {
    id: '6',
    title: 'Data Structures & Algorithms in Python for Placements',
    topic: 'Data Structures & Algorithms',
    estimatedTime: '10 weeks', // > 50 hours
    description: 'Master essential data structures and algorithms using Python, focusing on interview preparation for top tech companies. Includes problem-solving strategies and complexity analysis.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'python algorithms'
  },
  {
    id: '7',
    title: 'Data Structures & Algorithms in Java for Placements',
    topic: 'Data Structures & Algorithms',
    estimatedTime: '10 weeks', // > 50 hours
    description: 'Conquer essential data structures and algorithms using Java, with a strong focus on preparing for technical interviews at leading tech companies. Covers core concepts, problem-solving techniques, and performance analysis.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'java algorithms'
  },
  {
    id: '8',
    title: 'Ultimate Placement Success Program',
    topic: 'Career Development',
    estimatedTime: '24 Weeks', // > 200 hours
    description: 'A complete program designed to equip you with all the necessary technical and soft skills for landing your dream job. Covers advanced DSA, system design, behavioral interviews, resume building, mock interviews, and much more.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'career interview'
  },
  {
    id: '9',
    title: 'Comprehensive SQL for Data Analysis',
    topic: 'Databases & SQL',
    estimatedTime: '8 Weeks', // > 50 hours
    description: 'Master SQL from the ground up. Learn to write complex queries, analyze data, and manage databases effectively. Covers DDL, DML, DQL, advanced joins, subqueries, window functions, and performance tuning.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'database sql'
  },
  {
    id: '10',
    title: 'Comprehensive Computer Networks',
    topic: 'Computer Networks',
    estimatedTime: '9 Weeks', // > 50 hours
    description: 'Understand the fundamentals of computer networking, from protocols and architectures to security and troubleshooting. Covers TCP/IP, OSI model, routing, switching, wireless networks, and more.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'network computer'
  },
  {
    id: '11',
    title: 'Comprehensive Operating Systems',
    topic: 'Operating Systems',
    estimatedTime: '15 Weeks', // > 150 hours
    description: 'Dive deep into the core concepts of operating systems. Learn about process management, memory management, file systems, concurrency, and distributed systems. Essential for system-level programming and understanding how computers work.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'kernel system'
  },
  {
    id: '12',
    title: 'Class 11 PCM (Physics, Chemistry, Mathematics)',
    topic: 'Science & Math (Grade 11)',
    estimatedTime: '40 Weeks', // > 500 hours
    description: 'A comprehensive course covering the complete Class 11 syllabus for Physics, Chemistry, and Mathematics (PCM). Designed to build a strong foundation for competitive exams and higher education.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'textbook study'
  },
  {
    id: '13',
    title: 'Class 11 PCB (Physics, Chemistry, Biology)',
    topic: 'Science (Grade 11)',
    estimatedTime: '40 Weeks', // > 500 hours
    description: 'A comprehensive course covering the complete Class 11 syllabus for Physics, Chemistry, and Biology (PCB). Tailored for students aiming for medical and biological science careers, building a strong foundation for competitive exams.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'microscope biology'
  },
  {
    id: '14',
    title: 'Class 12 PCM (Physics, Chemistry, Mathematics)',
    topic: 'Science & Math (Grade 12)',
    estimatedTime: '44 Weeks', // > 550 hours
    description: 'A comprehensive course covering the complete Class 12 syllabus for Physics, Chemistry, and Mathematics (PCM). Focuses on board exam preparation and competitive entrance exams like JEE.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'education exam'
  },
  {
    id: '15',
    title: 'Class 12 PCB (Physics, Chemistry, Biology)',
    topic: 'Science (Grade 12)',
    estimatedTime: '44 Weeks', // > 500 hours
    description: 'A comprehensive course covering the complete Class 12 syllabus for Physics, Chemistry, and Biology (PCB). Tailored for students aiming for medical and biological science careers, with a focus on board exams and competitive entrance exams like NEET.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'science medical'
  },
  {
    id: '16',
    title: 'Comprehensive Class 10 Curriculum',
    topic: 'General Studies (Grade 10)',
    estimatedTime: '40 Weeks', // > 500 hours
    description: 'A full curriculum covering all major subjects for Class 10, including Mathematics, Science (Physics, Chemistry, Biology), Social Studies (History, Geography, Civics, Economics), and English. Designed for thorough understanding and board exam preparation.',
    imageUrl: 'https://placehold.co/600x400.png',
    dataAiHint: 'education school'
  }
];

export const mockReadingLog: ReadingLogEntry[] = [
  { id: '1', title: 'Sapiens: A Brief History of Humankind', author: 'Yuval Noah Harari', status: 'Read', rating: 5, finishDate: '2023-05-15T00:00:00.000Z' },
  { id: '2', title: 'Atomic Habits', author: 'James Clear', status: 'Reading', rating: 4 },
  { id: '3', title: 'The Pragmatic Programmer', author: 'Andrew Hunt, David Thomas', status: 'To Read' },
  { id: '4', title: 'Dune', author: 'Frank Herbert', status: 'Read', rating: 5, finishDate: '2022-11-20T00:00:00.000Z' },
  { id: '5', title: 'Thinking, Fast and Slow', author: 'Daniel Kahneman', status: 'On Hold', rating: 3 },
  { id: '6', title: 'Physics Part I - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
  { id: '7', title: 'Physics Part II - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
  { id: '8', title: 'Chemistry Part I - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
  { id: '9', title: 'Chemistry Part II - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
  { id: '10', title: 'Mathematics Part I - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
  { id: '11', title: 'Mathematics Part II - Textbook for Class XII', author: 'NCERT', status: 'To Read' },
];

export const mockNotes: Note[] = [
  { id: '1', title: 'JavaScript Hoisting', content: '```javascript\nconsole.log(x);\nvar x = 5;\n// Outputs: undefined\n```\nHoisting is JavaScript\'s default behavior of moving declarations to the top.', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
  { id: '2', title: 'CSS Flexbox Guide', content: '## Flex Container Properties\n- `display: flex`\n- `flex-direction`\n- `justify-content`\n- `align-items`\n\n## Flex Item Properties\n- `flex-grow`\n- `flex-shrink`\n- `flex-basis`\n- `order`\n- `align-self`', createdAt: new Date().toISOString(), updatedAt: new Date().toISOString() },
];

export const mockSchedule: ScheduledItem[] = [
  { id: '1', title: 'JavaScript Lecture 1.1', startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 1)).toISOString(), type: 'lesson', color: 'hsl(var(--primary))' },
  { id: '2', title: 'Study Group: Organic Chem', startTime: new Date(new Date().setDate(new Date().getDate() + 1)).toISOString(), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 1)).setHours(new Date().getHours() + 2)).toISOString(), type: 'study', color: 'hsl(var(--accent))' },
  { id: '3', title: 'Quiz: World History Ch. 3', startTime: new Date(new Date().setDate(new Date().getDate() + 2)).toISOString(), endTime: new Date(new Date(new Date().setDate(new Date().getDate() + 2)).setHours(new Date().getHours() + 0.5)).toISOString(), type: 'exam', color: 'hsl(var(--destructive))' },
];

// Keep a few examples as fallback or for testing, but the main source is now the Genkit flow.
export const mockInteractiveVideos: InteractiveVideo[] = [
   { id: 'fallback-song', title: 'Fallback Song Example', youtubeId: 'dQw4w9WgXcQ', category: 'songs', description: 'A well-known classic.' },
   { id: 'fallback-edu', title: 'Fallback Education Example', youtubeId: ' languesEB1H7s', category: 'education', description: 'An educational placeholder.'}
];