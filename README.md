# Read-Me

# Tune 'n Drop: Read-me

Tune 'n Drop is a a music player and visualizer in which a 2-D newtonian object "plays" any melody the user gives it. The melody is repeated continuously, and the path the object travels will never be the same twice. All melodies are saved and made available in a global feed.

### Installation
1. Git clone this repository
2. Enter the root directory and run:
```console
npm install
```
3. run:
```
nodemon
```
4. Visit url 'localhost:3000' (google Chrome reccomended)

### Mechanics
The piano, timer, and visualizer were all hard coded for this project. The timer keeps track of 'Note' objects, which include a pitch and a time stamp, and stores them in an array as the user plays them. This array is then passed in to the visualizer; the visualizer tracks the location of a circle object, and, using the physic's engine's internal timer, creates blockers at the appropriate times. Once all the blockers have been placed and hit, an ending section is triggered, in which the block bursts and the platforms fall. The function is then recursively called again using the same notes.

### Primary Technologies Used
- Matterjs
- Node
- Express
- Mongoose

#### Other Technologies Used
- Body-parser
- fs
- morgan
- Ajax
- Jquery
- HTML / CSS

### Thank Yous:
- @liabru for his quick, useful responses to github issues (and for creating Matterjs. That too was helpful)
- 'pinkyfinger' at freesound.com, for uploading 11 piano key sounds to the api (though I feel like he should have uploaded 12 notes, to make it a full octave, because to get that root note I had to use an alternative source and the volume and tone is slightly different and it bothers me every time. But it's fine. Whatever.)
- @williamfshaw and @jasonseminara for approving the concept without asking too many questions.
- My fellow WDI-bacon compatriots, for their advice, enthusiasm, encouragement, and healthy skepticism.

### To Do
- Fine tune predictions; blockers are occasionally missed
- Give recorded melodies some sort of label
- Look into music/melody APIs for a search feature.
