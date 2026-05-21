import { createContext, useContext, useMemo } from 'react';

const PatientContext = createContext(null);

export function PatientProvider({ children }) {
  const value = useMemo(
    () => ({
      patientName: 'Priya Sharma',
      sessionId: 'NTX-2024-001',
      sessionStartTime: new Date().toISOString()
    }),
    []
  );

  return <PatientContext.Provider value={value}>{children}</PatientContext.Provider>;
}

export function usePatient() {
  const context = useContext(PatientContext);
  if (!context) {
    throw new Error('usePatient must be used inside PatientProvider');
  }
  return context;
}
