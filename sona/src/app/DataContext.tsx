import React, { createContext, useContext, useState } from "react";
const DataContext = createContext<SlackContextType | null>(null);

export default DataContext;
