import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

import { calculateFinances } from "../utils/financeCalculations";
import {
  readUserFinance,
  writeUserFinance,
  getCurrentUserId,
} from "../utils/storage";

const FinanceContext = createContext(null);

/* Default empty financial data for a new user */
export function createEmptyFinanceData() {
  return {
    currency: "INR",
    profile: { name: "", email: "", phone: "", currency: "INR" },
    preferences: { theme: "dark", motion: "system", notifications: true, goalReminders: true, compactDashboard: false },
    cashBalance: 0,
    income: [],
    expenses: [],
    assets: [],
    investments: [],
    liabilities: [],
    loans: [],
    goals: [],
    transactions: [],
    simulationSettings: {
      annualReturnPercent: 6,
      inflationPercent: 5,
    },
  };
}

const COLLECTIONS = [
  "income",
  "expenses",
  "assets",
  "investments",
  "liabilities",
  "loans",
  "goals",
  "transactions",
];

const makeId = () =>
  globalThis.crypto?.randomUUID?.() ||
  `${Date.now()}-${Math.random().toString(16).slice(2)}`;

/* Validate and normalize financial data */
function normalizeFinanceData(value) {
  const empty = createEmptyFinanceData();

  if (
    !value ||
    typeof value !== "object" ||
    Array.isArray(value)
  ) {
    return empty;
  }

  const normalized = { ...empty, ...value };
  normalized.profile = { ...empty.profile, ...(value.profile && typeof value.profile === "object" ? value.profile : {}) };
  normalized.preferences = { ...empty.preferences, ...(value.preferences && typeof value.preferences === "object" ? value.preferences : {}) };

  for (const key of COLLECTIONS) {
    normalized[key] = Array.isArray(value[key])
      ? value[key].filter(
          (item) =>
            item &&
            typeof item === "object" &&
            !Array.isArray(item)
        )
      : [];
  }

  const cash = Number(normalized.cashBalance);

  normalized.cashBalance =
    Number.isFinite(cash) && cash >= 0 ? cash : 0;

  normalized.currency =
    typeof normalized.currency === "string"
      ? normalized.currency
      : "INR";

  normalized.simulationSettings = {
    annualReturnPercent: Number.isFinite(
      Number(value.simulationSettings?.annualReturnPercent)
    )
      ? Number(value.simulationSettings.annualReturnPercent)
      : 6,

    inflationPercent: Number.isFinite(
      Number(value.simulationSettings?.inflationPercent)
    )
      ? Number(value.simulationSettings.inflationPercent)
      : 5,
  };

  return normalized;
}

/* Main finance provider */
export function FinanceProvider({ children, userId = getCurrentUserId() }) {
  const [financeData, setFinanceData] = useState(() =>
    userId
      ? normalizeFinanceData(
          readUserFinance(userId, createEmptyFinanceData)
        )
      : createEmptyFinanceData()
  );

  const [storageStatus, setStorageStatus] = useState("ready");

  /* Load the correct user's data */
  useEffect(() => {
    setFinanceData(
      userId
        ? normalizeFinanceData(
            readUserFinance(userId, createEmptyFinanceData)
          )
        : createEmptyFinanceData()
    );

    setStorageStatus("ready");
  }, [userId]);

  /* Save financial data for the identified user */
  useEffect(() => {
    if (!userId) return;

    const saved = writeUserFinance(userId, financeData);

    setStorageStatus(saved ? "saved" : "error");
  }, [financeData, userId]);

  /* Update the finance data */
  const updateFinanceData = useCallback((updater) => {
    setFinanceData((current) => {
      const next =
        typeof updater === "function"
          ? updater(current)
          : { ...current, ...updater };

      return normalizeFinanceData(next);
    });
  }, []);

  /*
   * FIX: Update simulation settings.
   * Preserve existing settings when only one setting changes.
   */
  const updateProfile = useCallback((profile) => {
    updateFinanceData((current) => ({ ...current, profile: { ...current.profile, ...profile }, currency: profile.currency || current.currency }));
  }, [updateFinanceData]);

  const updatePreferences = useCallback((preferences) => {
    updateFinanceData((current) => ({ ...current, preferences: { ...current.preferences, ...preferences } }));
  }, [updateFinanceData]);

  const updateSimulationSettings = useCallback(
    (settings) => {
      updateFinanceData((current) => ({
        ...current,
        simulationSettings: {
          ...current.simulationSettings,
          ...settings,
        },
      }));
    },
    [updateFinanceData]
  );

  /* Add a record to a supported collection */
  const addRecord = useCallback(
    (collection, record) => {
      if (!COLLECTIONS.includes(collection)) {
        throw new Error(
          `Unknown finance collection: ${collection}`
        );
      }

      const newRecord = {
        ...record,
        id: record?.id || makeId(),
      };

      updateFinanceData((current) => ({
        ...current,
        [collection]: [
          ...current[collection],
          newRecord,
        ],
      }));

      return newRecord.id;
    },
    [updateFinanceData]
  );

  /* Update an existing record */
  const updateRecord = useCallback(
    (collection, id, changes) => {
      if (!COLLECTIONS.includes(collection)) {
        throw new Error(
          `Unknown finance collection: ${collection}`
        );
      }

      updateFinanceData((current) => ({
        ...current,
        [collection]: current[collection].map((item) =>
          item.id === id
            ? { ...item, ...changes, id }
            : item
        ),
      }));
    },
    [updateFinanceData]
  );

  /* Delete an existing record */
  const deleteRecord = useCallback(
    (collection, id) => {
      if (!COLLECTIONS.includes(collection)) {
        throw new Error(
          `Unknown finance collection: ${collection}`
        );
      }

      updateFinanceData((current) => ({
        ...current,
        [collection]: current[collection].filter(
          (item) => item.id !== id
        ),
      }));
    },
    [updateFinanceData]
  );

  /* Calculate financial summaries */
  const calculations = useMemo(
    () => calculateFinances(financeData),
    [financeData]
  );

  /* Expose data and functions to every consumer */
  const value = useMemo(
    () => ({
      userId: userId || null,
      financeData,
      profile: financeData.profile,
      preferences: financeData.preferences,
      incomeSources: financeData.income,
      expenseCategories: financeData.expenses,
      calculations,
      storageStatus,

      updateFinanceData,
      updateProfile,
      updatePreferences,
      updateSimulationSettings,
      setIncomeSources: (items) => updateFinanceData((current) => ({ ...current, income: items })),
      setExpenseCategories: (items) => updateFinanceData((current) => ({ ...current, expenses: items })),
      setInvestments: (items) => updateFinanceData((current) => ({ ...current, investments: items })),
      setLiabilities: (items) => updateFinanceData((current) => ({ ...current, liabilities: items })),

      addRecord,
      updateRecord,
      deleteRecord,

      setCashBalance: (amount) =>
        updateFinanceData((current) => ({
          ...current,
          cashBalance: amount,
        })),

      resetFinanceData: () =>
        updateFinanceData(createEmptyFinanceData()),
    }),
    [
      userId,
      financeData,
      calculations,
      storageStatus,
      updateFinanceData,
      updateProfile,
      updatePreferences,
      updateSimulationSettings,
      addRecord,
      updateRecord,
      deleteRecord,
    ]
  );

  return (
    <FinanceContext.Provider value={value}>
      {children}
    </FinanceContext.Provider>
  );
}

/* Access finance data from React components */
export function useFinance() {
  const context = useContext(FinanceContext);

  if (!context) {
    throw new Error(
      "useFinance must be used inside <FinanceProvider>."
    );
  }

  return context;
}