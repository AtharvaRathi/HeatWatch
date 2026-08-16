import { describe, test, expect } from 'vitest';
import { filterAlerts } from './alertFilters';

const alerts = [
  {
    id: 1,
    code: 'red',
    city: 'Mumbai',
    title: 'Severe Heatwave Alert',
    state: 'Maharashtra'
  },
  {
    id: 2,
    code: 'orange',
    city: 'Pune',
    title: 'Heatwave Warning',
    state: 'Maharashtra'
  },
  {
    id: 3,
    code: 'yellow',
    city: 'Delhi',
    title: 'High Temperature Warning',
    state: 'Delhi'
  },
  {
    id: 4,
    code: 'green',
    city: 'Nagpur',
    title: 'Normal Weather',
    state: 'Maharashtra'
  },
  {
    id: 5,
    code: 'green',
    city: 'Surat',
    title: 'Normal Weather',
    state: 'Gujarat'
  }
];

describe('filterAlerts', () => {

  test('should return all alerts when active tab is all', () => {
    const result = filterAlerts(alerts, 'all', '');

    expect(result).toHaveLength(5);
  });

  test('should return only red alerts', () => {
    const result = filterAlerts(alerts, 'red', '');

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('red');
  });

  test('should return only orange alerts', () => {
    const result = filterAlerts(alerts, 'orange', '');

    expect(result).toHaveLength(1);
    expect(result[0].code).toBe('orange');
  });

  test('should search alerts by city', () => {
    const result = filterAlerts(alerts, 'all', 'Mumbai');

    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Mumbai');
  });

  test('should search alerts by title', () => {
    const result = filterAlerts(alerts, 'all', 'Heatwave');

    expect(result).toHaveLength(2);
  });

  test('should search alerts by state', () => {
    const result = filterAlerts(alerts, 'all', 'Gujarat');

    expect(result).toHaveLength(1);
    expect(result[0].state).toBe('Gujarat');
  });

  test('should perform case-insensitive search', () => {
    const result = filterAlerts(alerts, 'all', 'mUmBaI');

    expect(result).toHaveLength(1);
    expect(result[0].city).toBe('Mumbai');
  });

  test('should return empty array when no alert matches', () => {
    const result = filterAlerts(alerts, 'all', 'Chennai');

    expect(result).toHaveLength(0);
  });

  test('should perform case-insensitive state search', () => {
    const result = filterAlerts(alerts, 'all', 'gUjArAt');

    expect(result).toHaveLength(1);
    expect(result[0].state).toBe('Gujarat');
  });

});