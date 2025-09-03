import React, { memo, useState, useCallback } from 'react';
import TaskItem from './TaskItem';
import TaskForm from './TaskForm';
import Modal from '../UI/Modal';
import Button from '../UI/Button';
import Select from '../UI/Select';
import { useTasks } from '../../hooks/useTasks';

const TaskList = memo(() => {
  const {
    tasks,
    loading,
    error,
    createTask,
    updateTask,
    deleteTask,
    toggleTaskStatus,
    filters,
    setFilters,
    taskStats
  } = useTasks();

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formLoading, setFormLoading] = useState(false);

  const handleCreateTask = useCallback(async (taskData) => {
    setFormLoading(true);
    try {
      await createTask(taskData);
      setIsCreateModalOpen(false);
    } catch (error) {
      throw error;
    } finally {
      setFormLoading(false);
    }
  }, [createTask]);

  const handleEditTask = useCallback(async (taskData) => {
    setFormLoading(true);
    try {
      await updateTask(editingTask._id, taskData);
      setIsEditModalOpen(false);
      setEditingTask(null);
    } catch (error) {
      throw error;
    } finally {
      setFormLoading(false);
    }
  }, [updateTask, editingTask]);

  const handleDeleteTask = useCallback(async (taskId) => {
    if (window.confirm('Êtes-vous sûr de vouloir supprimer cette tâche ?')) {
      try {
        await deleteTask(taskId);
      } catch (error) {
        alert('Erreur lors de la suppression: ' + error.message);
      }
    }
  }, [deleteTask]);

  const handleEditClick = useCallback((task) => {
    setEditingTask(task);
    setIsEditModalOpen(true);
  }, []);

  const handleFilterChange = useCallback((filterType, value) => {
    setFilters(prev => ({
      ...prev,
      [filterType]: value === '' ? undefined : value
    }));
  }, [setFilters]);

  const statusOptions = [
    { value: '', label: 'Tous les statuts' },
    { value: 'todo', label: 'À faire' },
    { value: 'in_progress', label: 'En cours' },
    { value: 'done', label: 'Terminé' }
  ];

  const priorityOptions = [
    { value: '', label: 'Toutes les priorités' },
    { value: 'high', label: 'Haute' },
    { value: 'medium', label: 'Moyenne' },
    { value: 'low', label: 'Basse' }
  ];

  if (error) {
    return (
      <div className="bg-danger-50 border border-danger-200 rounded-md p-4">
        <p className="text-danger-600">Erreur: {error}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* En-tête avec statistiques */}
      <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold text-gray-900">Mes Tâches</h1>
          <Button onClick={() => setIsCreateModalOpen(true)}>
            ➕ Nouvelle tâche
          </Button>
        </div>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-600">{taskStats.total}</div>
            <div className="text-sm text-gray-500">Total</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-gray-500">{taskStats.todo}</div>
            <div className="text-sm text-gray-500">À faire</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-warning-600">{taskStats.inProgress}</div>
            <div className="text-sm text-gray-500">En cours</div>
          </div>
          <div className="text-center">
            <div className="text-2xl font-bold text-success-600">{taskStats.done}</div>
            <div className="text-sm text-gray-500">Terminées</div>
          </div>
        </div>
      </div>

      {/* Filtres */}
      <div className="bg-white rounded-lg shadow-sm p-4 border border-gray-200">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <Select
            label="Filtrer par statut"
            value={filters.status || ''}
            onChange={(e) => handleFilterChange('status', e.target.value)}
            options={statusOptions}
          />
          <Select
            label="Filtrer par priorité"
            value={filters.priority || ''}
            onChange={(e) => handleFilterChange('priority', e.target.value)}
            options={priorityOptions}
          />
        </div>
      </div>

      {/* Liste des tâches */}
      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary-500"></div>
        </div>
      ) : tasks.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-500">Aucune tâche trouvée.</p>
          <Button 
            className="mt-4" 
            onClick={() => setIsCreateModalOpen(true)}
          >
            Créer votre première tâche
          </Button>
        </div>
      ) : (
        <div className="space-y-4">
          {tasks.map((task) => (
            <TaskItem
              key={task._id}
              task={task}
              onToggleStatus={toggleTaskStatus}
              onEdit={handleEditClick}
              onDelete={handleDeleteTask}
            />
          ))}
        </div>
      )}

      {/* Modal de création */}
      <Modal
        isOpen={isCreateModalOpen}
        onClose={() => setIsCreateModalOpen(false)}
        title="Créer une nouvelle tâche"
        size="lg"
      >
        <TaskForm
          onSubmit={handleCreateTask}
          onCancel={() => setIsCreateModalOpen(false)}
          loading={formLoading}
        />
      </Modal>

      {/* Modal de modification */}
      <Modal
        isOpen={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
          setEditingTask(null);
        }}
        title="Modifier la tâche"
        size="lg"
      >
        <TaskForm
          initialTask={editingTask}
          onSubmit={handleEditTask}
          onCancel={() => {
            setIsEditModalOpen(false);
            setEditingTask(null);
          }}
          loading={formLoading}
        />
      </Modal>
    </div>
  );
});

TaskList.displayName = 'TaskList';

export default TaskList;
