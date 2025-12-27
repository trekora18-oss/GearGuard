import { useApp } from '../../context/AppContext';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Button } from '../../components/common/Button';
import { Plus, Users, User as UserIcon } from 'lucide-react';
// import type { Technician, Team } from '../../types'; // Not used as values, but implicit?
// Actually if I don't use them, I should remove them or use type import if I cast.
// I'll remove them if unused.

export default function TeamList() {
    const { teams, technicians } = useApp();

    const getTeamName = (teamId: string) => {
        return teams.find(t => t.id === teamId)?.name || 'Unassigned';
    };

    const getUtilizationColor = (util: number) => {
        if (util >= 90) return 'bg-destructive';
        if (util >= 75) return 'bg-warning';
        return 'bg-success';
    };

    return (
        <div className="space-y-8">
            <div>
                <h1 className="text-3xl font-bold tracking-tight">Teams & Technicians</h1>
                <p className="text-muted-foreground mt-1">Manage maintenance workforce and assignments.</p>
            </div>

            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {teams.map((team) => (
                    <Card key={team.id}>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                {team.name}
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold">{technicians.filter(t => t.teamId === team.id).length}</div>
                            <p className="text-xs text-muted-foreground">
                                Members
                            </p>
                        </CardContent>
                    </Card>
                ))}
                <Card className="flex items-center justify-center border-dashed cursor-pointer hover:bg-muted/50 transition-colors">
                    <div className="flex flex-col items-center text-muted-foreground">
                        <Plus className="h-8 w-8 mb-2" />
                        <span className="text-sm font-medium">Add Team</span>
                    </div>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <div className="flex items-center justify-between">
                        <div>
                            <CardTitle>Technicians</CardTitle>
                            <CardDescription>Directory of all maintenance personnel.</CardDescription>
                        </div>
                        <Button>
                            <Plus className="mr-2 h-4 w-4" /> Add Technician
                        </Button>
                    </div>
                </CardHeader>
                <CardContent>
                    <div className="rounded-md border border-border">
                        <table className="w-full text-sm text-left">
                            <thead className="bg-muted/50 text-muted-foreground font-medium">
                                <tr>
                                    <th className="p-4">Name</th>
                                    <th className="p-4">Specialization</th>
                                    <th className="p-4">Team</th>
                                    <th className="p-4">Utilization</th>
                                    <th className="p-4 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-border">
                                {technicians.map((tech) => (
                                    <tr key={tech.id} className="hover:bg-muted/50 transition-colors">
                                        <td className="p-4 flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-primary/10 flex items-center justify-center">
                                                <UserIcon className="h-4 w-4 text-primary" />
                                            </div>
                                            <div>
                                                <div className="font-medium text-foreground">{tech.name}</div>
                                                <div className="text-xs text-muted-foreground">{tech.email}</div>
                                            </div>
                                        </td>
                                        <td className="p-4">{tech.specialization}</td>
                                        <td className="p-4">
                                            <Badge variant="outline">{getTeamName(tech.teamId)}</Badge>
                                        </td>
                                        <td className="p-4">
                                            <div className="flex items-center space-x-2">
                                                <div className="w-24 bg-secondary h-2 rounded-full overflow-hidden">
                                                    <div
                                                        className={`h-full rounded-full ${getUtilizationColor(tech.utilization)}`}
                                                        style={{ width: `${tech.utilization}%` }}
                                                    />
                                                </div>
                                                <span className="text-xs text-muted-foreground">{tech.utilization}%</span>
                                            </div>
                                        </td>
                                        <td className="p-4 text-right">
                                            <Badge variant="secondary">Active</Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
