# mudl-backend

This is a backend API for the mudl application.

Please see the current deployed backend at mudl-backend.herokuapp.com  

Some routes that are of note to see functionality of the app will be as follows:  

https://mudl-backend.herokuapp.com/apiroutes/mood  to get the initial basic moods, then you can select your mood to move on to a more specific emotion


https://mudl-backend.herokuapp.com/apiroutes/mood/surprised if you choose surprised will return the following as tertiary emotion options:

{
"secondary_emotion": "confused",
"secondary_emotion_def": "unable to think clearly; bewildered"
},
{
"secondary_emotion": "amazed",
"secondary_emotion_def": "greatly surprised; astonished"
},
{
"secondary_emotion": "excited",
"secondary_emotion_def": "very enthusiastic and eager"
},
{
"secondary_emotion": "startled",
"secondary_emotion_def": "feeling or showing sudden shock or alarm"
}
]


if you choose a secondary emotion such as excited it will look as follows: https://mudl-backend.herokuapp.com/apiroutes/mood/surprised/excited

and will return the underlying tertiary emotions as follows: 
[
{
"id": 79,
"primary_emotion": "surprised",
"secondary_emotion": "excited",
"secondary_emotion_def": "very enthusiastic and eager",
"tertiary_emotion": "energetic",
"tertiary_emotion_def": "showing or involving great activity or vitality"
},
{
"id": 80,
"primary_emotion": "surprised",
"secondary_emotion": "excited",
"secondary_emotion_def": "very enthusiastic and eager",
"tertiary_emotion": "eager",
"tertiary_emotion_def": "wanting to do or have something very much"
},
{
"id": 81,
"primary_emotion": "surprised",
"secondary_emotion": "excited",
"secondary_emotion_def": "very enthusiastic and eager",
"tertiary_emotion": "excited",
"tertiary_emotion_def": ""
}
]

This is an example of the generaly flow of the application on the front end. Please see the front end application here for full use:  
https://github.com/malvarius/mudlFrontEnd
