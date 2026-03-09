"use client";

import { FormEvent, useMemo, useState } from "react";

type ShiftEntry = {
  id: string;
  jobName: string;
  date: string;
  clockIn: string;
  clockOut: string;
  hourlyRate: number;
};

const pounds = new Intl.NumberFormat("en-GB", {
  style: "currency",
  currency: "GBP",
});

const getHoursWorked = (clockIn: string, clockOut: string) => {
  const [inHour, inMin] = clockIn.split(":").map(Number);
  const [outHour, outMin] = clockOut.split(":").map(Number);

  const inMinutes = inHour * 60 + inMin;
  const outMinutes = outHour * 60 + outMin;

  const totalMinutes = outMinutes >= inMinutes ? outMinutes - inMinutes : 24 * 60 - inMinutes + outMinutes;

  return totalMinutes / 60;
};

const getWeekStart = (date: Date) => {
  const next = new Date(date);
  const day = (next.getDay() + 6) % 7;
  next.setDate(next.getDate() - day);
  next.setHours(0, 0, 0, 0);
  return next;
};

export default function Home() {
  const [jobName, setJobName] = useState("");
  const [date, setDate] = useState("");
  const [clockIn, setClockIn] = useState("");
  const [clockOut, setClockOut] = useState("");
  const [hourlyRate, setHourlyRate] = useState("12");
  const [shifts, setShifts] = useState<ShiftEntry[]>([]);

  const enrichedShifts = useMemo(() => {
    return shifts
      .map((shift) => {
        const hours = getHoursWorked(shift.clockIn, shift.clockOut);
        const pay = hours * shift.hourlyRate;
        return { ...shift, hours, pay };
      })
      .sort((a, b) => (a.date < b.date ? 1 : -1));
  }, [shifts]);

  const totals = useMemo(() => {
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const weekStart = getWeekStart(now);

    return enrichedShifts.reduce(
      (acc, shift) => {
        const shiftDate = new Date(`${shift.date}T00:00:00`);
        const isThisWeek = shiftDate >= weekStart && shiftDate <= now;
        const isThisMonth = shiftDate.getMonth() === currentMonth && shiftDate.getFullYear() === currentYear;

        if (isThisWeek) {
          acc.weekHours += shift.hours;
          acc.weekPay += shift.pay;
        }

        if (isThisMonth) {
          acc.monthHours += shift.hours;
          acc.monthPay += shift.pay;
        }

        acc.totalHours += shift.hours;
        acc.totalPay += shift.pay;

        return acc;
      },
      {
        weekHours: 0,
        weekPay: 0,
        monthHours: 0,
        monthPay: 0,
        totalHours: 0,
        totalPay: 0,
      }
    );
  }, [enrichedShifts]);

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!jobName || !date || !clockIn || !clockOut || !hourlyRate) {
      return;
    }

    const parsedRate = Number(hourlyRate);

    if (Number.isNaN(parsedRate) || parsedRate <= 0) {
      return;
    }

    const shift: ShiftEntry = {
      id: crypto.randomUUID(),
      jobName,
      date,
      clockIn,
      clockOut,
      hourlyRate: parsedRate,
    };

    setShifts((current) => [...current, shift]);
    setClockIn("");
    setClockOut("");
    setDate("");
  };

  const removeShift = (id: string) => {
    setShifts((current) => current.filter((shift) => shift.id !== id));
  };

  return (
    <main className="min-h-screen bg-slate-100 p-6 text-slate-900">
      <div className="mx-auto max-w-6xl space-y-6">
        <header className="rounded-2xl bg-white p-6 shadow-sm">
          <h1 className="text-3xl font-bold">UK Worker Shift & Salary Tracker</h1>
          <p className="mt-2 text-slate-600">
            Add shifts for different jobs, track weekly/monthly hours, and estimate pay from your hourly rate.
          </p>
        </header>

        <section className="grid gap-6 lg:grid-cols-[1fr_2fr]">
          <form onSubmit={handleSubmit} className="rounded-2xl bg-white p-6 shadow-sm">
            <h2 className="text-xl font-semibold">Log a shift</h2>
            <div className="mt-4 space-y-4">
              <label className="block text-sm font-medium">
                Job name
                <input
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={jobName}
                  onChange={(event) => setJobName(event.target.value)}
                  placeholder="Warehouse, Café, Delivery..."
                  required
                />
              </label>

              <label className="block text-sm font-medium">
                Shift date
                <input
                  type="date"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  required
                />
              </label>

              <div className="grid grid-cols-2 gap-3">
                <label className="block text-sm font-medium">
                  Clock in
                  <input
                    type="time"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                    value={clockIn}
                    onChange={(event) => setClockIn(event.target.value)}
                    required
                  />
                </label>
                <label className="block text-sm font-medium">
                  Clock out
                  <input
                    type="time"
                    className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                    value={clockOut}
                    onChange={(event) => setClockOut(event.target.value)}
                    required
                  />
                </label>
              </div>

              <label className="block text-sm font-medium">
                Hourly rate (£)
                <input
                  type="number"
                  min="1"
                  step="0.01"
                  className="mt-1 w-full rounded-lg border border-slate-300 px-3 py-2"
                  value={hourlyRate}
                  onChange={(event) => setHourlyRate(event.target.value)}
                  required
                />
              </label>

              <button className="w-full rounded-lg bg-slate-900 px-4 py-2 font-medium text-white hover:bg-slate-700" type="submit">
                Add Shift
              </button>
            </div>
          </form>

          <div className="space-y-6">
            <section className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-600">This week</p>
                <p className="mt-2 text-2xl font-bold">{totals.weekHours.toFixed(2)} hrs</p>
                <p className="text-slate-700">{pounds.format(totals.weekPay)}</p>
              </article>
              <article className="rounded-2xl bg-white p-5 shadow-sm">
                <p className="text-sm text-slate-600">This month</p>
                <p className="mt-2 text-2xl font-bold">{totals.monthHours.toFixed(2)} hrs</p>
                <p className="text-slate-700">{pounds.format(totals.monthPay)}</p>
              </article>
              <article className="rounded-2xl bg-white p-5 shadow-sm sm:col-span-2 xl:col-span-1">
                <p className="text-sm text-slate-600">All shifts</p>
                <p className="mt-2 text-2xl font-bold">{totals.totalHours.toFixed(2)} hrs</p>
                <p className="text-slate-700">{pounds.format(totals.totalPay)}</p>
              </article>
            </section>

            <section className="rounded-2xl bg-white p-6 shadow-sm">
              <h2 className="text-xl font-semibold">Shift history</h2>
              {enrichedShifts.length === 0 ? (
                <p className="mt-3 text-slate-600">No shifts logged yet.</p>
              ) : (
                <ul className="mt-4 space-y-3">
                  {enrichedShifts.map((shift) => (
                    <li key={shift.id} className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-slate-200 p-4">
                      <div>
                        <p className="font-semibold">{shift.jobName}</p>
                        <p className="text-sm text-slate-600">
                          {shift.date} · {shift.clockIn} - {shift.clockOut} · £{shift.hourlyRate.toFixed(2)}/hr
                        </p>
                        <p className="text-sm">
                          {shift.hours.toFixed(2)} hrs · {pounds.format(shift.pay)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeShift(shift.id)}
                        className="rounded-lg border border-slate-300 px-3 py-2 text-sm hover:bg-slate-100"
                      >
                        Remove
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </section>
          </div>
        </section>
      </div>
    </main>
  );
}
