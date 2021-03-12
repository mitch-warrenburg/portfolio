import React, { FC } from 'react';

import './styles.scss';

const HomeScreen: FC = () => {
  return (
    <div className="app-container">
      <div className="app-left">
        <button className="close-menu">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="app-logo">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-bar-chart-2">
            <line x1="18" y1="20" x2="18" y2="10" />
            <line x1="12" y1="20" x2="12" y2="4" />
            <line x1="6" y1="20" x2="6" y2="14" />
          </svg>
          <span>Recruiter</span>
        </div>
        <ul className="nav-list">
          <li className="nav-list-item active">
            <a className="nav-list-link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-columns">
                <path d="M12 3h7a2 2 0 0 1 2 2v14a2 2 0 0 1-2 2h-7m0-18H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h7m0-18v18" />
              </svg>
              Dashboard
            </a>
          </li>
          <li className="nav-list-item">
            <a className="nav-list-link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-briefcase">
                <rect x="2" y="7" width="20" height="14" rx="2" ry="2" />
                <path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16" />
              </svg>
              Jobs
            </a>
          </li>
          <li className="nav-list-item">
            <a className="nav-list-link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-file">
                <path d="M13 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V9z" />
                <polyline points="13 2 13 9 20 9" />
              </svg>
              Applications
            </a>
          </li>
          <li className="nav-list-item">
            <a className="nav-list-link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-users">
                <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2" />
                <circle cx="9" cy="7" r="4" />
                <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
                <path d="M16 3.13a4 4 0 0 1 0 7.75" />
              </svg>
              Team
            </a>
          </li>
          <li className="nav-list-item">
            <a className="nav-list-link" href="#">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-pie-chart">
                <path d="M21.21 15.89A10 10 0 1 1 8 2.83" />
                <path d="M22 12A10 10 0 0 0 12 2v10z" />
              </svg>
              Reports
            </a>
          </li>
        </ul>
      </div>
      <div className="app-main">
        <div className="main-header-line">
          <h1>Applications Dashboard</h1>
          <div className="action-buttons">
            <button className="open-right-area">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-activity">
                <polyline points="22 12 18 12 15 21 9 3 6 12 2 12" />
              </svg>
            </button>
            <button className="menu-button">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="feather feather-menu">
                <line x1="3" y1="12" x2="21" y2="12" />
                <line x1="3" y1="6" x2="21" y2="6" />
                <line x1="3" y1="18" x2="21" y2="18" />
              </svg>
            </button>
          </div>
        </div>
        <div className="chart-row three">
          <div className="chart-container-wrapper">
            <div className="chart-container">
              <div className="chart-info-wrapper">
                <h2>Applications</h2>
                <span>20.5 K</span>
              </div>
              <div className="chart-svg">
                <svg viewBox="0 0 36 36" className="circular-chart pink">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray="30, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">
                    30%
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container">
              <div className="chart-info-wrapper">
                <h2>Shortlisted</h2>
                <span>5.5 K</span>
              </div>
              <div className="chart-svg">
                <svg viewBox="0 0 36 36" className="circular-chart blue">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray="60, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">
                    60%
                  </text>
                </svg>
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper">
            <div className="chart-container">
              <div className="chart-info-wrapper">
                <h2>On-hold</h2>
                <span>10.5 K</span>
              </div>
              <div className="chart-svg">
                <svg viewBox="0 0 36 36" className="circular-chart orange">
                  <path
                    className="circle-bg"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <path
                    className="circle"
                    strokeDasharray="90, 100"
                    d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                  />
                  <text x="18" y="20.35" className="percentage">
                    90%
                  </text>
                </svg>
              </div>
            </div>
          </div>
        </div>
        <div className="chart-row two">
          <div className="chart-container-wrapper big">
            <div className="chart-container">
              <div className="chart-container-header">
                <h2>Top Active Jobs</h2>
                <span>Last 30 days</span>
              </div>
              <div className="line-chart">
                <canvas id="chart" />
              </div>
              <div className="chart-data-details">
                <div className="chart-details-header" />
              </div>
            </div>
          </div>
          <div className="chart-container-wrapper small">
            <div className="chart-container">
              <div className="chart-container-header">
                <h2>Acquisitions</h2>
                <span>This month</span>
              </div>
              <div className="acquisitions-bar">
                <span className="bar-progress rejected" style={{ width: '8%' }} />
                <span className="bar-progress on-hold" style={{ width: '10%' }} />
                <span className="bar-progress shortlisted" style={{ width: '18%' }} />
                <span className="bar-progress applications" style={{ width: '64%' }} />
              </div>
              <div className="progress-bar-info">
                <span className="progress-color applications" />
                <span className="progress-type">Applications</span>
                <span className="progress-amount">64%</span>
              </div>
              <div className="progress-bar-info">
                <span className="progress-color shortlisted" />
                <span className="progress-type">Shortlisted</span>
                <span className="progress-amount">18%</span>
              </div>
              <div className="progress-bar-info">
                <span className="progress-color on-hold" />
                <span className="progress-type">On-hold</span>
                <span className="progress-amount">10%</span>
              </div>
              <div className="progress-bar-info">
                <span className="progress-color rejected" />
                <span className="progress-type">Rejected</span>
                <span className="progress-amount">8%</span>
              </div>
            </div>
            <div className="chart-container applicants">
              <div className="chart-container-header">
                <h2>New Applicants</h2>
                <span>Today</span>
              </div>
              <div className="applicant-line">
                <img
                  src="https://images.unsplash.com/photo-1587628604439-3b9a0aa7a163?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MjB8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="profile"
                />
                <div className="applicant-info">
                  <span>Emma Ray</span>
                  <p>
                    Applied for <strong>Product Designer</strong>
                  </p>
                </div>
              </div>
              <div className="applicant-line">
                <img
                  src="https://images.unsplash.com/photo-1583195764036-6dc248ac07d9?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2555&q=80"
                  alt="profile"
                />
                <div className="applicant-info">
                  <span>Ricky James</span>
                  <p>
                    Applied for <strong>IOS Developer</strong>
                  </p>
                </div>
              </div>
              <div className="applicant-line">
                <img
                  src="https://images.unsplash.com/photo-1450297350677-623de575f31c?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzV8fHdvbWFufGVufDB8fDB8&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                  alt="profile"
                />
                <div className="applicant-info">
                  <span>Julia Wilson</span>
                  <p>
                    Applied for <strong>UI Developer</strong>
                  </p>
                </div>
              </div>
              <div className="applicant-line">
                <img
                  src="https://images.unsplash.com/photo-1596815064285-45ed8a9c0463?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1215&q=80"
                  alt="profile"
                />
                <div className="applicant-info">
                  <span>Jess Watson</span>
                  <p>
                    Applied for <strong>Design Lead</strong>
                  </p>
                </div>
              </div>
              <div className="applicant-line">
                <img
                  src="https://images.unsplash.com/photo-1543965170-4c01a586684e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2232&q=80"
                  alt="profile"
                />
                <div className="applicant-info">
                  <span>John Pellegrini</span>
                  <p>
                    Applied for <strong>Back-End Developer</strong>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="app-right">
        <button className="close-right">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="feather feather-x">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        </button>
        <div className="profile-box">
          <div className="profile-photo-wrapper">
            <img
              src="https://images.unsplash.com/photo-1551292831-023188e78222?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MTE0fHxwb3J0cmFpdHxlbnwwfDB8MHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
              alt="profile"
            />
          </div>
          <p className="profile-text">Julia Pellegrini</p>
          <p className="profile-subtext">Recruiting Manager</p>
        </div>
        <div className="app-right-content">
          <div className="app-right-section">
            <div className="app-right-section-header">
              <h2>Messages</h2>
              <span className="notification-active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-message-square">
                  <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
                </svg>
              </span>
            </div>
            <div className="message-line">
              <img
                src="https://images.unsplash.com/photo-1562159278-1253a58da141?ixid=MXwxMjA3fDB8MHxzZWFyY2h8MzB8fHBvcnRyYWl0JTIwbWFufGVufDB8MHwwfA%3D%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=900&q=60"
                alt="profile"
              />
              <div className="message-text-wrapper">
                <p className="message-text">Eric Clampton</p>
                <p className="message-subtext">Have you planned any deadline for this?</p>
              </div>
            </div>
            <div className="message-line">
              <img
                src="https://images.unsplash.com/photo-1604004555489-723a93d6ce74?ixlib=rb-1.2.1&ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&auto=format&fit=crop&w=934&q=80"
                alt="profile"
              />
              <div className="message-text-wrapper">
                <p className="message-text">Jess Flax</p>
                <p className="message-subtext">
                  Can we schedule another meeting for next thursday?
                </p>
              </div>
            </div>
            <div className="message-line">
              <img
                src="https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=2250&q=80"
                alt="profile"
              />
              <div className="message-text-wrapper">
                <p className="message-text">Pam Halpert</p>
                <p className="message-subtext">The candidate has been shorlisted.</p>
              </div>
            </div>
          </div>
          <div className="app-right-section">
            <div className="app-right-section-header">
              <h2>Activity</h2>
              <span className="notification-active">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-bell">
                  <path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9" />
                  <path d="M13.73 21a2 2 0 0 1-3.46 0" />
                </svg>
              </span>
            </div>
            <div className="activity-line">
              <span className="activity-icon warning">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-alert-circle">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  Your plan is expires in <strong>3 days.</strong>
                </p>
                <a className="activity-link" href="#">
                  Renew Now
                </a>
              </div>
            </div>
            <div className="activity-line">
              <span className="activity-icon applicant">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-plus">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  There are <strong>3 new applications</strong> for{' '}
                  <strong>UI Developer</strong>
                </p>
              </div>
            </div>
            <div className="activity-line">
              <span className="activity-icon close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x-circle">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  Your teammate, <strong>Wade Wilson</strong> has closed the job post of{' '}
                  <strong>IOS Developer</strong>
                </p>
              </div>
            </div>
            <div className="activity-line">
              <span className="activity-icon applicant">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-plus">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  There are <strong>4 new applications</strong> for{' '}
                  <strong>Front-End Developer</strong>
                </p>
              </div>
            </div>
            <div className="activity-line">
              <span className="activity-icon applicant">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-plus">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="12" y1="18" x2="12" y2="12" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  There are <strong>2 new applications</strong> for{' '}
                  <strong>Design Lead</strong>
                </p>
              </div>
            </div>
            <div className="activity-line">
              <span className="activity-icon close">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-x-circle">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="15" y1="9" x2="9" y2="15" />
                  <line x1="9" y1="9" x2="15" y2="15" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  Your teammate, <strong>Wade Wilson</strong> has closed the job post of{' '}
                  <strong>Back-End Developer</strong>
                </p>
              </div>
            </div>
            <div className="activity-line">
              <span className="activity-icon draft">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="feather feather-file-minus">
                  <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z" />
                  <polyline points="14 2 14 8 20 8" />
                  <line x1="9" y1="15" x2="15" y2="15" />
                </svg>
              </span>
              <div className="activity-text-wrapper">
                <p className="activity-text">
                  You have drafted a job post for <strong>HR Specialist</strong>
                </p>
                <a href="#" className="activity-link">
                  Complete Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomeScreen;
