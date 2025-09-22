Project Title: Singing Bowl Serenity Web App

Goal: Create a user-friendly web application that generates unique, relaxing singing bowl soundscapes based on user preferences.

Core Features:

Sound Generation:

Generate authentic-sounding singing bowl tones.

Allow for a range of notes/frequencies (e.g., C3 to B4).

Incorporate realistic decay and sustain for each bowl strike.

Implement subtle variations in timbre and resonance for each generated "bowl."

User Customization:

Number of Bowls: User can select how many singing bowls are present in the soundscape (e.g., 1-5).

Key/Scale: User can choose a musical key or scale for the generated melody (e.g., C Major, G Minor Pentatonic, A Phrygian, or a "random" option).

Tempo/Pacing: User can adjust the speed at which bowls are struck (e.g., slow, moderate, random, or BPM input).

Reverb/Ambience: User can control the amount of reverb or spaciousness.

Loop Length: User can set the duration of the generated sequence before it subtly loops or transitions.

Randomize Button: A single button to generate a completely new, random soundscape based on a variety of parameters.

Playback Controls:

Play/Pause button.

Volume control.

"Generate New" button to create a fresh soundscape based on current settings.

Visual Feedback (Optional but Recommended):

A simple, calming visual representation during playback (e.g., subtle pulsing circles, abstract light patterns, or even just the current settings displayed). This should be unobtrusive and enhance relaxation.

Technical Stack (Suggested):

Frontend:

HTML5, CSS3 (with a focus on clean, minimalist design).

JavaScript (for all interactive elements and audio manipulation).

Web Audio API: Essential for generating and manipulating sound directly in the browser. Consider a library like Tone.js for easier sound synthesis and scheduling, or implement directly with Web Audio API for maximum control.

Backend: None required for this client-side application. All processing should occur in the user's browser.

Detailed Requirements:

User Interface (UI):

Intuitive and easy to navigate.

Calming color scheme (e.g., pastels, muted tones, natural colors).

Responsive design for various screen sizes (desktop, tablet, mobile).

Clear labels for all controls.

Audio Generation Logic:

When "Generate New" is clicked, or settings are changed, a new sequence of bowl strikes should be composed.

The sequence should feel organic and non-repetitive, even if parameters are fixed. Use subtle randomization in timing and velocity of strikes within the chosen tempo.

Implement smooth transitions between loops.

Consider micro-variations in pitch (e.g., detuning) to make multiple bowls sound distinct.

Sound Assets (if not synthesizing entirely): If pre-recorded samples are used, they should be high-quality, single strikes of singing bowls. The app would then trigger these samples and apply effects. However, synthesizing sounds directly with the Web Audio API or Tone.js is preferred for greater flexibility and smaller app size.

Performance: The app should be lightweight and perform smoothly without causing excessive CPU usage.

Accessibility: Consider basic accessibility features (e.g., keyboard navigation for controls).

Example User Flow:

User lands on the page.

Default "calm" soundscape starts playing automatically or after clicking a "Start" button.

User adjusts "Number of Bowls" to 3.

User changes "Key" to "G Minor Pentatonic."

User increases "Reverb" slightly.

User clicks "Generate New" to hear the updated soundscape.

User clicks "Randomize" to get a completely new combination of settings and sound.

this is the original prompt. keep it in a .md file

Deliverables:

Fully functional web application (HTML, CSS, JavaScript files).

Clear and commented code.

A brief README explaining how to run the application locally and any specific implementation details.

AI Agent Instructions:

"Given the above detailed prompt, generate all necessary HTML, CSS, and JavaScript files to create the 'Singing Bowl Serenity' web application. Focus on implementing the core features, especially robust sound generation using the Web Audio API (or Tone.js if appropriate), and a clean, responsive user interface. Prioritize functionality and a smooth user experience."
