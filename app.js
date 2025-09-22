document.addEventListener('DOMContentLoaded', () => {

    // --- DOM Element References ---
    const dom = {
        playPauseBtn: document.getElementById('play-pause-btn'),
        generateBtn: document.getElementById('generate-btn'),
        randomizeBtn: document.getElementById('randomize-btn'),
        bowlsSlider: document.getElementById('bowls-slider'),
        bowlsValue: document.getElementById('bowls-value'),
        scaleSelect: document.getElementById('scale-select'),
        tempoSlider: document.getElementById('tempo-slider'),
        tempoValue: document.getElementById('tempo-value'),
        reverbSlider: document.getElementById('reverb-slider'),
        reverbValue: document.getElementById('reverb-value'),
        loopSlider: document.getElementById('loop-slider'),
        loopValue: document.getElementById('loop-value'),
        volumeSlider: document.getElementById('volume-slider'),
        visualizer: document.getElementById('visualizer-container')
    };

    // --- Audio Setup (Tone.js) ---
    const reverb = new Tone.Reverb({ decay: 8, wet: 0.5 }).toDestination();
    const volume = new Tone.Volume(-6).connect(reverb);

    // A synth that sounds like a singing bowl
    const bowlSynth = new Tone.MetalSynth({
        frequency: 200,
        harmonicity: 2.5,
        modulationIndex: 10,
        resonance: 3000,
        octaves: 2,
        envelope: {
            attack: 0.005,
            decay: 4,
            release: 1.4
        },
    }).connect(volume);

    // --- Music Theory ---
    const scales = {
        'major': ['C4', 'D4', 'E4', 'F4', 'G4', 'A4', 'B4', 'C5'],
        'minor-pentatonic': ['C4', 'Eb4', 'F4', 'G4', 'Bb4', 'C5'],
        'phrygian': ['C4', 'Db4', 'E4', 'F4', 'G4', 'Ab4', 'Bb4', 'C5'],
        'lydian': ['C4', 'D4', 'E4', 'F#4', 'G4', 'A4', 'B4', 'C5'],
        'whole-tone': ['C4', 'D4', 'E4', 'F#4', 'G#4', 'A#4', 'C5'],
    };

    // --- State Management ---
    let settings = {};
    let sequence;
    let isPlaying = false;
    let audioInitialized = false;

    // --- Core Functions ---

    function updateSettings() {
        settings = {
            numBowls: parseInt(dom.bowlsSlider.value, 10),
            scale: dom.scaleSelect.value,
            tempo: parseInt(dom.tempoSlider.value, 10),
            reverb: parseFloat(dom.reverbSlider.value),
            loopLength: parseInt(dom.loopSlider.value, 10),
            volume: parseFloat(dom.volumeSlider.value),
        };
        // Update UI labels
        dom.bowlsValue.textContent = settings.numBowls;
        dom.tempoValue.textContent = settings.tempo;
        dom.reverbValue.textContent = settings.reverb.toFixed(2);
        dom.loopValue.textContent = settings.loopLength;
        // Update audio params
        Tone.Transport.bpm.value = settings.tempo;
        reverb.wet.value = settings.reverb;
        volume.volume.value = Tone.gainToDb(settings.volume);
    }

    function generateSequence() {
        const selectedScaleName = settings.scale === 'random'
            ? Object.keys(scales)[Math.floor(Math.random() * Object.keys(scales).length)]
            : settings.scale;

        const currentScale = scales[selectedScaleName];
        const notes = [];

        for (let i = 0; i < settings.loopLength; i++) {
            // Decide if a note should play at this step
            if (Math.random() < (settings.numBowls / 8)) { // Probability based on bowl count
                const note = currentScale[Math.floor(Math.random() * currentScale.length)];
                const time = `${Math.floor(i / 4)}:${i % 4}`; // Quantize to 16th notes
                const velocity = 0.5 + Math.random() * 0.5; // Random velocity
                const duration = '8n';
                notes.push({ time, note, velocity, duration });
            }
        }
        return notes;
    }

    function regenerateSoundscape() {
        if (sequence) {
            sequence.stop();
            sequence.clear();
            sequence.dispose();
        }
        updateSettings();
        const noteEvents = generateSequence();
        sequence = new Tone.Part((time, value) => {
            bowlSynth.triggerAttackRelease(value.note, value.duration, time, value.velocity);
            // Trigger visualizer
            createVisual(value.note);
        }, noteEvents).start(0);

        sequence.loop = true;
        sequence.loopEnd = `${Math.floor(settings.loopLength / 4)}m`; // e.g., 16 beats = 4 measures
    }

    function createVisual(note) {
        const visual = document.createElement('div');
        visual.classList.add('note-visual');

        // Simple hash to get a color from the note
        let hash = 0;
        for (let i = 0; i < note.length; i++) {
            hash = note.charCodeAt(i) + ((hash << 5) - hash);
        }
        const color = `hsl(${hash % 360}, 70%, 60%)`;

        visual.style.backgroundColor = color;
        visual.style.left = `${Math.random() * 90}%`;
        visual.style.top = `${Math.random() * 90}%`;

        dom.visualizer.appendChild(visual);

        setTimeout(() => {
            visual.remove();
        }, 2000); // Remove after 2 seconds
    }


    // --- Event Listeners ---

    dom.playPauseBtn.addEventListener('click', async () => {
        if (!audioInitialized) {
            await Tone.start();
            audioInitialized = true;
            console.log('Audio Context started.');
        }

        if (isPlaying) {
            Tone.Transport.pause();
            isPlaying = false;
            dom.playPauseBtn.textContent = 'Play';
            dom.playPauseBtn.classList.remove('playing');
        } else {
            Tone.Transport.start();
            isPlaying = true;
            dom.playPauseBtn.textContent = 'Pause';
            dom.playPauseBtn.classList.add('playing');
        }
    });

    dom.generateBtn.addEventListener('click', () => {
        regenerateSoundscape();
    });

    dom.randomizeBtn.addEventListener('click', () => {
        dom.bowlsSlider.value = Math.floor(Math.random() * 7) + 1;
        dom.scaleSelect.selectedIndex = Math.floor(Math.random() * dom.scaleSelect.options.length);
        dom.tempoSlider.value = Math.floor(Math.random() * 120) + 30;
        dom.reverbSlider.value = Math.random().toFixed(2);
        dom.loopSlider.value = (Math.floor(Math.random() * 8) + 1) * 4;

        regenerateSoundscape();
    });

    // Listeners for controls to update in real-time
    [dom.bowlsSlider, dom.tempoSlider, dom.reverbSlider, dom.loopSlider, dom.volumeSlider].forEach(slider => {
        slider.addEventListener('input', updateSettings);
    });
    // Regenerate soundscape when sliders are released or scale is changed
    [dom.bowlsSlider, dom.tempoSlider, dom.loopSlider, dom.scaleSelect].forEach(el => {
        el.addEventListener('change', regenerateSoundscape);
    });

    // --- Initial Setup ---
    regenerateSoundscape();

    // Add dynamic styles for the visualizer to the head
    const style = document.createElement('style');
    style.innerHTML = `
        .note-visual {
            position: absolute;
            width: 50px;
            height: 50px;
            border-radius: 50%;
            opacity: 0;
            animation: pulse 2s ease-out;
        }
        @keyframes pulse {
            0% { transform: scale(0.5); opacity: 0.7; }
            100% { transform: scale(1.5); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
});
