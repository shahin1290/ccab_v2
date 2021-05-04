import React from 'react'

export default function ResultScreen() {
  return (
    <>
      {/* Result Section */}
      <div className="result-section">
        <div className="auto-container">
          <div className="inner-container">
            {/* Sec Title */}
            <div className="sec-title centered">
              <h4>Quiz Result</h4>
            </div>
            <ul className="result-options">
              <li>
                <span className="icon flaticon-check-1"></span>Right <i>(25)</i>
              </li>
              <li>
                <span className="icon flaticon-close"></span>Wrong <i>(05)</i>
              </li>
              <li>
                <span className="icon number">25</span>Out Of <i>(30)</i>
              </li>
            </ul>
            <h2>Congratulation! Jonathon Deo</h2>
            <a href="#" className="theme-btn btn-style-one">
              <span className="txt">Download Certificate</span>
            </a>
          </div>
        </div>
      </div>
      {/* End Result Section */}
    </>
  )
}
