"use client";
import { useState } from "react";
import translations from "../../locales/translation";
import Icon from "@mdi/react";
import { mdiCalendarRange, mdiCalendarToday, mdiCloseThick } from "@mdi/js";

// Composant du calendrier interactif avec support multilingue et sélection d'intervalle
export default function Calendar({
  onDateSelect,
  selectedDate,
  onRangeSelect,
}) {
  const [currentMonth, setCurrentMonth] = useState(new Date().getMonth());
  const [currentYear, setCurrentYear] = useState(new Date().getFullYear());
  const [showYearSelector, setShowYearSelector] = useState(false);

  // État pour la sélection d'intervalle
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [isSelectingRange, setIsSelectingRange] = useState(false);
  const t = translations;

  // Fonction pour obtenir les jours d'un mois
  const getDaysInMonth = (month, year) => {
    return new Date(year, month + 1, 0).getDate();
  };

  // Fonction pour obtenir le jour de la semaine du premier jour du mois
  const getFirstDayOfMonth = (month, year) => {
    return new Date(year, month, 1).getDay();
  };

  // Navigation vers le mois précédent
  const goToPreviousMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11);
      setCurrentYear(currentYear - 1);
    } else {
      setCurrentMonth(currentMonth - 1);
    }
  };

  // Navigation vers le mois suivant
  const goToNextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0);
      setCurrentYear(currentYear + 1);
    } else {
      setCurrentMonth(currentMonth + 1);
    }
  };

  // Sélection d'une année
  const selectYear = (year) => {
    setCurrentYear(year);
    setShowYearSelector(false);
  };

  // Génération de la liste des années (actuelle +/- 5 ans)
  const years = Array.from({ length: 11 }, (_, i) => currentYear - 5 + i);

  // Convertir un jour en objet date
  const createDateFromDay = (day) => {
    return new Date(currentYear, currentMonth, day);
  };

  // Effacer la sélection
  const clearSelection = () => {
    if (onRangeSelect) {
      onRangeSelect(null, null);
    } else if (onDateSelect) {
      onDateSelect(null);
    }
    setStartDate(null);
    setEndDate(null);
    setIsSelectingRange(false);
  };

  // Activer/désactiver le mode de sélection d'intervalle
  const toggleRangeSelection = () => {
    if (isSelectingRange) {
      // Si on désactive la sélection d'intervalle, on efface la sélection
      clearSelection();
    }
    setIsSelectingRange(!isSelectingRange);
  };

  // Sélection d'une date
  const handleDateClick = (day) => {
    const clickedDate = createDateFromDay(day);

    if (isSelectingRange) {
      let start = null;
      let end = null;
      if (!startDate) {
        setStartDate(clickedDate);
      } else if (!endDate) {
        start = startDate;
        end = clickedDate;

        // date debut doit etre avant a date fin
        if (clickedDate < startDate) {
          start = clickedDate;
          end = startDate;
        }

        setStartDate(start);
        setEndDate(end);

        if (onRangeSelect) onRangeSelect(start, end);
      } else {
        setStartDate(clickedDate);
        setEndDate(null);
        if (onDateSelect) onDateSelect(clickedDate);
      }
    } else {
      if (onDateSelect) onDateSelect(clickedDate);
    }
  };

  // Vérification si une date est la date de début
  const isStartDate = (day) => {
    if (!startDate) return false;
    return (
      startDate.getDate() === day &&
      startDate.getMonth() === currentMonth &&
      startDate.getFullYear() === currentYear
    );
  };

  // Vérification si une date est la date de fin
  const isEndDate = (day) => {
    if (!endDate) return false;
    return (
      endDate.getDate() === day &&
      endDate.getMonth() === currentMonth &&
      endDate.getFullYear() === currentYear
    );
  };

  // Vérification si une date est dans l'intervalle sélectionné
  const isInRange = (day) => {
    if (!startDate || !endDate) return false;

    const date = createDateFromDay(day);
    return date > startDate && date < endDate;
  };

  // Vérification si une date est la date sélectionnée (mode simple)
  const isSelectedDate = (day) => {
    if (!selectedDate || isSelectingRange) return false;
    const date = new Date(selectedDate);
    return (
      date.getDate() === day &&
      date.getMonth() === currentMonth &&
      date.getFullYear() === currentYear
    );
  };

  // Vérification si une date est aujourd'hui
  const isToday = (day) => {
    const today = new Date();
    return (
      day === today.getDate() &&
      currentMonth === today.getMonth() &&
      currentYear === today.getFullYear()
    );
  };

  // Génération du calendrier
  const generateCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth, currentYear);
    const firstDayOfMonth = getFirstDayOfMonth(currentMonth, currentYear);
    const calendarDays = [];

    // Jours vides en début de mois
    for (let i = 0; i < firstDayOfMonth; i++) {
      calendarDays.push(
        <div key={`empty-${i}`} className="text-center p-2"></div>
      );
    }

    // Jours du mois
    for (let day = 1; day <= daysInMonth; day++) {
      let dayClassName =
        "text-center p-2 cursor-pointer hover:bg-blue-100 rounded-full";

      if (isStartDate(day) || isEndDate(day)) {
        dayClassName =
          "text-center p-2 cursor-pointer bg-blue-600 text-white rounded-full";
      } else if (isInRange(day)) {
        dayClassName =
          "text-center p-2 cursor-pointer bg-blue-200 rounded-full";
      } else if (isSelectedDate(day)) {
        dayClassName =
          "text-center p-2 cursor-pointer bg-blue-600 text-white rounded-full";
      } else if (isToday(day)) {
        dayClassName =
          "text-center p-2 cursor-pointer bg-blue-100 font-bold rounded-full";
      }

      calendarDays.push(
        <div
          key={`day-${day}`}
          onClick={() => handleDateClick(day)}
          className={dayClassName}
        >
          {day}
        </div>
      );
    }

    return calendarDays;
  };

  return (
    <div className="bg-white h-fit rounded-lg shadow-md overflow-hidden w-80">
      {/* En-tête du calendrier */}
      <div className="bg-[#1D589F] text-white p-6">
        <div className="flex justify-between items-center">
          <button
            onClick={goToPreviousMonth}
            className="text-white hover:text-gray-200 rounded-full p-1"
          >
            &lt;
          </button>
          <div
            className="text-center cursor-pointer"
            onClick={() => setShowYearSelector(!showYearSelector)}
          >
            {t.months[currentMonth]} {currentYear}
          </div>
          <button
            onClick={goToNextMonth}
            className="text-white rounded-full p-1"
          >
            &gt;
          </button>
        </div>
      </div>

      <div className="w-full mx-auto relative">
        {showYearSelector && (
          <div className="absolute left-1/2 -translate-x-1/2 bg-white shadow-lg rounded-lg p-3 z-10 w-48 max-h-60 overflow-y-auto">
            <div className="text-center text-sm font-bold mb-2">
              {t.selectYear}
            </div>
            {years.map((year) => (
              <div
                key={year}
                onClick={() => selectYear(year)}
                className={`p-2 text-center cursor-pointer hover:bg-blue-100 ${
                  year === currentYear ? "bg-blue-600 text-white" : ""
                }`}
              >
                {year}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Jours de la semaine */}
      <div className="grid grid-cols-7 gap-1 p-4 text-xs text-gray-700 border-b border-gray-200">
        {t.weekdays.map((day, index) => (
          <div key={index} className="text-center">
            {day}
          </div>
        ))}
      </div>

      {/* Jours du mois */}
      <div className="grid grid-cols-7 gap-1 p-2 text-sm">
        {generateCalendar()}
      </div>

      {/* Boutons de contrôle */}
      <div className="border-t border-gray-200 p-2 grid grid-cols-2 gap-2">
       {/*  <button
          onClick={() => {
            const today = new Date();
            setCurrentMonth(today.getMonth());
            setCurrentYear(today.getFullYear());
          }}
          className="flex justify-center py-1 bg-blue-100 text-[#1D589F] rounded hover:bg-blue-200 text-sm"
          title={t.today}
        >
          <Icon path={mdiCalendarToday} size={1} />
        </button> */}

        <button
          onClick={toggleRangeSelection}
          className={`flex justify-center items-center gap-1 py-1 rounded text-sm cursor ${
            isSelectingRange
              ? "bg-blue-300 text-blue-600 "
              : "bg-blue-100 text-[#1D589F] "
          }`}
          title={isSelectingRange ? t.clanderOption[0] : t.clanderOption[1]}
        >
          <Icon path={mdiCalendarRange} size={1} />
           <span>{isSelectingRange ? t.clanderOption[0] : t.clanderOption[1]}</span>
        </button>

        <button
          onClick={clearSelection}
          className="flex justify-center items-center gap-1 py-1  bg-red-100 text-red-600 rounded hover:bg-red-200 text-sm"
          title={t.clanderClear}
        >
          <Icon path={mdiCloseThick} size={1} />
          <span>{t.clanderClear}</span>
        </button>
       
      </div>
    </div>
  );
}
