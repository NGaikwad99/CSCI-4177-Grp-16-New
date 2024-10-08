/**
 * Author: Ahmed Al-Naamani(B00896307)
 * to test this locally change the BACKEND_URL of this page to http://localhost:3001 and change the Login's URL to http://localhost:3001https://csci-4177-grp-16-main.onrender.com
 */

import React, { useState, useEffect, useCallback, useRef} from 'react';
import axios from 'axios';
import { useLocation } from 'react-router-dom';
import { Calendar } from 'react-calendar';
import "./MeetingScheduler.css";
import TimePicker from 'react-time-picker';

const BACKEND_URL = 'https://csci-4177-grp-16-main.onrender.com';

function MeetingScheduler() {
    const location = useLocation();
    const [userRole, setUserRole] = useState(location.state?.userType || localStorage.getItem('role')); 

    useEffect(() => {
        if (!userRole) {
            const storedRole = localStorage.getItem('role');
            setUserRole(storedRole);
        }
        console.log('Location state:', location.state); 
        console.log('User Role from location state:', location.state?.userType); 
        console.log('User Role from localStorage:', localStorage.getItem('role')); 
        console.log('Final User Role:', userRole);
    }, [location.state, userRole]);

    const [meetingType, setMeetingType] = useState('');
    const [selectedPerson, setSelectedPerson] = useState('');
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [selectedTime, setSelectedTime] = useState('');
    const [upcomingMeetings, setUpcomingMeetings] = useState([]);
    const [showPrompt, setShowPrompt] = useState(false);
    const [alertMessage, setAlertMessage] = useState('');
    const [isRescheduling, setIsRescheduling] = useState(false);
    const [rescheduleIndex, setRescheduleIndex] = useState(null);
    const [showMore, setShowMore] = useState(false);
    const promptRef = useRef();
    const [availableUsers, setAvailableUsers] = useState([]);

    const fetchUsers = useCallback(async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/users`);
            const users = response.data.users;
            console.log('Fetched Users:', users);

            if (userRole === 'therapist') {
                setAvailableUsers(users.filter(user => user.role === 'patient'));
            } else {
                setAvailableUsers(users.filter(user => user.role === 'therapist'));
            }
        } catch (error) {
            console.error('Error fetching users:', error);
        }
    }, [userRole]);

    const fetchUpcomingMeetings = useCallback(async () => {
        try {
            const response = await axios.get(`${BACKEND_URL}/meetings/user/${userRole}`);
            console.log('Fetched Meetings:', response.data);
            setUpcomingMeetings(response.data);
        } catch (error) {
            console.error('Error fetching upcoming meetings:', error);
        }
    }, [userRole]);

    useEffect(() => {
        if (userRole) {
            fetchUsers();
            fetchUpcomingMeetings();
        }
    }, [userRole, fetchUsers, fetchUpcomingMeetings]);
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (promptRef.current && !promptRef.current.contains(event.target)) {
                setShowPrompt(false);
            }
        };

        const handleEscapePress = (event) => {
            if (event.key === 'Escape') {
                setShowPrompt(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        document.addEventListener('keydown', handleEscapePress);

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
            document.removeEventListener('keydown', handleEscapePress);
        };
    }, []);
    const handleScheduleMeeting = async () => {
        const today = new Date();
        today.setHours(0, 0, 0, 0);

        if (!meetingType) {
            setAlertMessage('Please select a meeting type.');
            return;
        }
        if (!selectedPerson && !isRescheduling) {
            setAlertMessage(`Please select a ${userRole === 'therapist' ? 'patient' : 'therapist'}.`);
            return;
        }
        if (selectedDate < today) {
            setAlertMessage('Please select a valid date.');
            return;
        }
        if (!selectedTime) {
            setAlertMessage('Please select a valid time.');
            return;
        }
        const newMeetingDate = selectedDate.toLocaleDateString();
        const newMeetingDateTime = `${newMeetingDate} ${selectedTime}`;
        const isDuplicate = upcomingMeetings.some(
            (meeting, index) => 
                meeting.date === newMeetingDateTime && 
                meeting.time === selectedTime &&
                meeting.person === selectedPerson &&
                index !== rescheduleIndex
        );

        if (isDuplicate) {
            setAlertMessage('The same person cannot book an appointment on the same day twice.');
            return;
        }

        const newMeeting = {
            date: newMeetingDate,
            time: selectedTime,
            person: selectedPerson,
            type: meetingType,
            userType: userRole
        };
        console.log('New Meeting:', newMeeting);
        try {
            if (isRescheduling) {
                const response = await axios.put(`${BACKEND_URL}/meetings/reschedule/${upcomingMeetings[rescheduleIndex]._id}`, newMeeting);
                const updatedMeetings = [...upcomingMeetings];
                updatedMeetings[rescheduleIndex] = {
                    ...response.data,
                    _id: upcomingMeetings[rescheduleIndex]._id
                };
                setUpcomingMeetings(updatedMeetings);
                setIsRescheduling(false);
                setRescheduleIndex(null);
            } else {
                const response = await axios.post(`${BACKEND_URL}/meetings/schedule`, newMeeting);
                setUpcomingMeetings([...upcomingMeetings, response.data]);
            }
            setShowPrompt(false);
            setAlertMessage('Meeting successfully booked.');
        } catch (error) {
            console.error('Error scheduling meeting:', error);
            setAlertMessage('Error scheduling meeting.');
        }
    };

    const handleReschedule = (index) => {
        const meeting = upcomingMeetings[index];
        console.log(`Rescheduling meeting with ObjectId: ${meeting._id}`);
        const [date, time] = meeting.date.split(' ');
        setSelectedDate(new Date(date));
        setSelectedTime(time);
        setMeetingType(meeting.type);
        setSelectedPerson(meeting.person);
        setIsRescheduling(true);
        setRescheduleIndex(index);
        setShowPrompt(true);
    };

    const handleCancel = async (index) => {
        try {
            const meetingId = upcomingMeetings[index]._id;
            console.log(`Cancelling meeting with _id: ${meetingId}`);
            await axios.delete(`${BACKEND_URL}/meetings/cancel/${meetingId}`);
            const updatedMeetings = upcomingMeetings.filter((_, i) => i !== index);
            setUpcomingMeetings(updatedMeetings);
            setAlertMessage('Meeting has been cancelled');
        } catch (error) {
            console.error('Error canceling meeting:', error);
            setAlertMessage('Error canceling meeting.');
        }
    };

    const visibleMeetings = showMore ? upcomingMeetings : upcomingMeetings.slice(0, 2);

    return (
        <div className="main-cont">
            <div className="left-section">
                <div className="meeting-scheduler">
                    <div className="flex-con">
                        <h2>Meeting Scheduler</h2>
                        <p>Schedule and manage your meetings</p>
                    </div>
                </div>
                <div className="calendar">
                    <Calendar
                        className="custom-calendar-main"
                        onChange={setSelectedDate}
                        value={selectedDate}
                        tileContent={({ date, view }) => {
                            const formattedDate = date.toLocaleDateString();
                            const hasMeeting = upcomingMeetings.some(meeting => meeting.date === formattedDate);
                            return hasMeeting ? <div className="dot"></div> : null;
                        }}
                    />
                </div>
            </div>
            <div className="upcoming">
                <div className="upcomingMeetingsGrid">
                    <div className='headerTextUpcoming'>
                        <h2 className='headerUpcoming'>Upcoming meetings</h2>
                    </div>
                    {visibleMeetings.map((meeting, index) => (
                        <div className="meeting" key={index}>
                            <h3>{`${meeting.date} ${meeting.time}`}</h3>
                            <p>{meeting.person}</p>
                            <p>{meeting.type}</p>
                            <div className="meeting-buttons">
                                <button className="reschedule-btn" onClick={() => handleReschedule(index)}>Reschedule</button>
                                <button className="cancel-btn" onClick={() => handleCancel(index)}>Cancel</button>
                            </div>
                        </div>
                    ))}
                    {upcomingMeetings.length > 2 && (
                        <button className="load-more-btn" onClick={() => setShowMore(!showMore)}>
                            {showMore ? 'Show Less' : 'Load More'}
                        </button>
                    )}
                    <button className="schedule-btn" onClick={() => setShowPrompt(true)}>Schedule a Meeting</button>
                </div>
            </div>
            {showPrompt && (
                <div className="prompt" ref={promptRef}>
                    <div className="prompt-content">
                        <h3>Meeting Type</h3>
                        <div className="radio-group">
                            <input
                                type="radio"
                                id="impromptu"
                                name="meetingType"
                                value="Impromptu"
                                onChange={(e) => setMeetingType(e.target.value)}
                                checked={meetingType === 'Impromptu'}
                            />
                            <label htmlFor="impromptu">Impromptu</label>
                            <input
                                type="radio"
                                id="oneOnOne"
                                name="meetingType"
                                value="One-on-One"
                                onChange={(e) => setMeetingType(e.target.value)}
                                checked={meetingType === 'One-on-One'}
                            />
                            <label htmlFor="oneOnOne">One-on-One</label>
                        </div>
                        {(!isRescheduling || userRole === 'therapist') && (
                            <>
                                <h3>Select {userRole === 'therapist' ? 'Patient' : 'Therapist'}</h3>
                                <select onChange={(e) => setSelectedPerson(e.target.value)} value={selectedPerson}>
                                    <option value="">Select</option>
                                    {availableUsers.map((person, index) => (
                                        <option key={index} value={person.name}>{person.name}</option>
                                    ))}
                                </select>
                            </>
                        )}
                        <div className="calendar-prompt">
                            <Calendar
                                className="custom-calendar-prompt"
                                onChange={setSelectedDate}
                                value={selectedDate}
                                tileContent={({ date, view }) => {
                                    const formattedDate = date.toLocaleDateString();
                                    const hasMeeting = upcomingMeetings.some(meeting => meeting.date === formattedDate);
                                    return hasMeeting ? <div className="dot"></div> : null;
                                }}
                            />
                        </div>
                        <div className="time-picker">
                            <h3>Select Time</h3>
                            <TimePicker
                                onChange={setSelectedTime}
                                value={selectedTime}
                                disableClock
                                format="h:mm a"
                                hourPlaceholder="hh"
                                minutePlaceholder="mm"
                                maxDetail="minute"
                                required
                            />
                        </div>
                        <button className="schedule-btn" onClick={handleScheduleMeeting}>Schedule</button>
                    </div>
                </div>
            )}
            {alertMessage && (
                <div className="alert">
                    <p>{alertMessage}</p>
                    <button onClick={() => setAlertMessage('')}>Close</button>
                </div>
            )}
        </div>
    );
}

export default MeetingScheduler;