import React from "react";

export default function Calendar({ events }) {
  const today = new Date();
  const year = today.getFullYear();
  const month = today.getMonth();

  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  const calendar = [];
  for (let i = 0; i < firstDay; i++) calendar.push(null);
  for (let i = 1; i <= daysInMonth; i++) calendar.push(i);

  const getEventsForDay = (day) => {
    const dateString = `${year}-${String(month + 1).padStart(2, "0")}-${String(
      day
    ).padStart(2, "0")}`;

    return events.filter((ev) => ev.date === dateString);
  };

  return (
    <div className="calendar-container">
      <div className="calendar-grid">
        {calendar.map((day, index) => (
          <div className="calendar-cell" key={index}>
            {day && (
              <>
                <div className="calendar-date">{day}</div>

                {/* SHOW EVENT IMAGE INSIDE SMALL CARD */}
                {getEventsForDay(day).map((ev, idx) => (
                  ev.image ? (
                    <img
                      key={idx}
                      src={ev.image}
                      alt="event"
                      className="calendar-event-img"
                    />
                  ) : (
                    <div key={idx} className="calendar-event-text">
                      {ev.title}
                    </div>
                  )
                ))}
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
