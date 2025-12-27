import { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Card, CardContent } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { format, startOfMonth, endOfMonth, eachDayOfInterval, isSameDay, addMonths, subMonths, isToday } from 'date-fns';

export default function MaintenanceCalendar() {
    const { requests, equipment } = useApp();
    const [currentDate, setCurrentDate] = useState(new Date());

    const monthStart = startOfMonth(currentDate);
    const monthEnd = endOfMonth(currentDate);
    const days = eachDayOfInterval({ start: monthStart, end: monthEnd });

    const getDayRequests = (date: Date) => {
        return requests.filter(req => {
            // Check scheduledDate or requestDate if scheduledDate is missing
            const targetDate = req.scheduledDate ? new Date(req.scheduledDate) : new Date(req.requestDate);
            return isSameDay(targetDate, date);
        });
    };

    const nextMonth = () => setCurrentDate(addMonths(currentDate, 1));
    const prevMonth = () => setCurrentDate(subMonths(currentDate, 1));
    const today = () => setCurrentDate(new Date());

    return (
        <div className="space-y-6 flex flex-col h-full">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold tracking-tight">Maintenance Calendar</h1>
                    <p className="text-muted-foreground mt-1">Schedule and view upcoming maintenance activities.</p>
                </div>
                <div className="flex items-center space-x-2">
                    <Button variant="outline" size="sm" onClick={today}>Today</Button>
                    <Button variant="ghost" size="icon" onClick={prevMonth}><ChevronLeft className="h-4 w-4" /></Button>
                    <div className="text-lg font-semibold w-32 text-center">
                        {format(currentDate, 'MMMM yyyy')}
                    </div>
                    <Button variant="ghost" size="icon" onClick={nextMonth}><ChevronRight className="h-4 w-4" /></Button>
                </div>
            </div>

            <Card className="flex-1 flex flex-col">
                <CardContent className="p-0 flex-1 flex flex-col">
                    <div className="grid grid-cols-7 border-b border-border bg-muted/40">
                        {['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'].map(day => (
                            <div key={day} className="p-4 text-center text-sm font-medium text-muted-foreground">
                                {day}
                            </div>
                        ))}
                    </div>
                    <div className="grid grid-cols-7 flex-1 auto-rows-fr divide-x divide-y divide-border">
                        {days.map((day) => {
                            const dayRequests = getDayRequests(day);
                            return (
                                <div key={day.toISOString()} className={`min-h-[100px] p-2 relative ${isToday(day) ? 'bg-primary/5' : ''}`}>
                                    <div className={`text-sm font-medium mb-1 ${isToday(day) ? 'text-primary' : 'text-muted-foreground'}`}>
                                        {format(day, 'd')}
                                    </div>
                                    <div className="space-y-1">
                                        {dayRequests.map(req => {
                                            const eq = equipment.find(e => e.id === req.equipmentId);
                                            return (
                                                <div key={req.id} className="text-xs p-1 rounded bg-secondary text-secondary-foreground truncate" title={req.subject}>
                                                    <span className="font-semibold block">{format(new Date(req.scheduledDate || req.requestDate), 'HH:mm')}</span>
                                                    {eq?.name} - {req.subject}
                                                </div>
                                            )
                                        })}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
