export const filterAlerts = (alerts, activeTab, searchTerm) => {
  return alerts.filter(alert => {
    const matchesTab =
      activeTab === 'all' || alert.code === activeTab;

    const matchesSearch =
      alert.city.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      alert.state.toLowerCase().includes(searchTerm.toLowerCase());

    return matchesTab && matchesSearch;
  });
};