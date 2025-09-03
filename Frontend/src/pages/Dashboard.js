import React, { memo, useMemo } from 'react';
import { Link } from 'react-router-dom';
import { useTasks } from '../hooks/useTasks';
import Button from '../components/UI/Button';

const Dashboard = memo(() => {
  const { allTasks, loading, taskStats } = useTasks();

  const recentTasks = useMemo(() => {
    return allTasks
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);
  }, [allTasks]);

  const upcomingTasks = useMemo(() => {
    const today = new Date();
    const nextWeek = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);
    
    return allTasks
      .filter(task => {
        if (!task.dueDate || task.status === 'done') return false;
        const dueDate = new Date(task.dueDate);
        return dueDate >= today && dueDate <= nextWeek;
      })
      .sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate))
      .slice(0, 5);
  }, [allTasks]);

  const getStatusColor = (status) => {
    switch (status) {
      case 'todo': return 'text-gray-600';
      case 'in_progress': return 'text-warning-600';
      case 'done': return 'text-success-600';
      default: return 'text-gray-600';
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-danger-600';
      case 'medium': return 'text-warning-600';
      case 'low': return 'text-success-600';
      default: return 'text-gray-600';
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('fr-FR');
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête de bienvenue */}
      <div className="glass-effect bg-gradient-to-r from-sky-400 to-blue-600 rounded-2xl shadow-2xl p-8 text-white animate-bounce-in floating-animation">
        <h1 className="text-4xl font-bold mb-3 animate-fade-in">🎯 Tableau de bord</h1>
        <p className="text-sky-100 text-lg animate-slide-in">
          ✨ Gérez vos tâches efficacement et restez productif
        </p>
      </div>

      {/* Statistiques rapides */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
        <div className="card text-center">
          <div className="text-3xl font-bold text-gray-600 mb-2">{taskStats.total}</div>
          <div className="text-gray-500">Tâches totales</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-gray-500 mb-2">{taskStats.todo}</div>
          <div className="text-gray-500">À faire</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-warning-600 mb-2">{taskStats.inProgress}</div>
          <div className="text-gray-500">En cours</div>
        </div>
        <div className="card text-center">
          <div className="text-3xl font-bold text-success-600 mb-2">{taskStats.done}</div>
          <div className="text-gray-500">Terminées</div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Tâches récentes */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Tâches récentes</h2>
            <Link to="/tasks">
              <Button variant="outline" size="sm">
                Voir toutes
              </Button>
            </Link>
          </div>
          
          {recentTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune tâche récente</p>
          ) : (
            <div className="space-y-3">
              {recentTasks.map((task) => (
                <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={getStatusColor(task.status)}>
                        {task.status === 'todo' ? 'À faire' : task.status === 'in_progress' ? 'En cours' : 'Terminé'}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-gray-500">
                    {formatDate(task.createdAt)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Tâches à venir */}
        <div className="card">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-semibold text-gray-900">Échéances à venir</h2>
            <Link to="/tasks">
              <Button variant="outline" size="sm">
                Planifier
              </Button>
            </Link>
          </div>
          
          {upcomingTasks.length === 0 ? (
            <p className="text-gray-500 text-center py-4">Aucune échéance prochaine</p>
          ) : (
            <div className="space-y-3">
              {upcomingTasks.map((task) => (
                <div key={task._id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900 truncate">{task.title}</h3>
                    <div className="flex items-center space-x-2 text-sm">
                      <span className={getStatusColor(task.status)}>
                        {task.status === 'todo' ? 'À faire' : task.status === 'in_progress' ? 'En cours' : 'Terminé'}
                      </span>
                      <span className="text-gray-400">•</span>
                      <span className={getPriorityColor(task.priority)}>
                        {task.priority === 'high' ? 'Haute' : task.priority === 'medium' ? 'Moyenne' : 'Basse'}
                      </span>
                    </div>
                  </div>
                  <div className="text-xs text-danger-600 font-medium">
                    📅 {formatDate(task.dueDate)}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Actions rapides */}
      <div className="card">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Actions rapides</h2>
        <div className="flex flex-wrap gap-4">
          <Link to="/tasks">
            <Button>
              📋 Voir toutes les tâches
            </Button>
          </Link>
          <Link to="/tasks">
            <Button variant="outline">
              ➕ Créer une tâche
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
});

Dashboard.displayName = 'Dashboard';

export default Dashboard;
