document.addEventListener('DOMContentLoaded', function() {
    const display = document.getElementById('display');
    const startPauseBtn = document.getElementById('startPauseBtn');
    const lapBtn = document.getElementById('lapBtn');
    const resetBtn = document.getElementById('resetBtn');
    const lapsList = document.getElementById('lapsList');
    
    let startTime;
    let elapsedTime = 0;
    let timerInterval;
    let isRunning = false;
    let lapCount = 0;
    
    // Format time as HH:MM:SS.mm
    function formatTime(time) {
        let hours = Math.floor(time / 3600000);
        let minutes = Math.floor((time % 3600000) / 60000);
        let seconds = Math.floor((time % 60000) / 1000);
        let milliseconds = Math.floor((time % 1000) / 10);
        
        return (
            String(hours).padStart(2, '0') + ':' +
            String(minutes).padStart(2, '0') + ':' +
            String(seconds).padStart(2, '0') + '.' +
            String(milliseconds).padStart(2, '0')
        );
    }
    
    // Update the display with the current time
    function updateDisplay() {
        display.textContent = formatTime(elapsedTime);
    }
    
    // Start or pause the stopwatch
    function toggleStartPause() {
        if (isRunning) {
            // Pause the stopwatch
            clearInterval(timerInterval);
            isRunning = false;
            startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
            startPauseBtn.className = 'btn start';
            lapBtn.disabled = true;
        } else {
            // Start the stopwatch
            startTime = Date.now() - elapsedTime;
            timerInterval = setInterval(function() {
                elapsedTime = Date.now() - startTime;
                updateDisplay();
            }, 10);
            isRunning = true;
            startPauseBtn.innerHTML = '<i class="fas fa-pause"></i> Pause';
            startPauseBtn.className = 'btn pause';
            lapBtn.disabled = false;
        }
    }
    
    // Record a lap time
    function recordLap() {
        if (!isRunning) return;
        
        lapCount++;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `
            <span class="lap-number">Lap ${lapCount}</span>
            <span class="lap-time">${formatTime(elapsedTime)}</span>
        `;
        
        // Add new lap at the top of the list
        if (lapsList.firstChild) {
            lapsList.insertBefore(lapItem, lapsList.firstChild);
        } else {
            lapsList.appendChild(lapItem);
        }
    }
    
    // Reset the stopwatch
    function resetStopwatch() {
        clearInterval(timerInterval);
        isRunning = false;
        elapsedTime = 0;
        lapCount = 0;
        updateDisplay();
        startPauseBtn.innerHTML = '<i class="fas fa-play"></i> Start';
        startPauseBtn.className = 'btn start';
        lapBtn.disabled = true;
        lapsList.innerHTML = '';
    }
    
    // Event listeners
    startPauseBtn.addEventListener('click', toggleStartPause);
    lapBtn.addEventListener('click', recordLap);
    resetBtn.addEventListener('click', resetStopwatch);
    
    // Keyboard shortcuts
    document.addEventListener('keydown', function(e) {
        if (e.code === 'Space') {
            e.preventDefault();
            toggleStartPause();
        } else if (e.code === 'KeyL' && isRunning) {
            recordLap();
        } else if (e.code === 'KeyR') {
            resetStopwatch();
        }
    });
});