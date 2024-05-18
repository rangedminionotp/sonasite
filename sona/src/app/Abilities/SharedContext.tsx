import React, { createContext, useContext, useState } from "react";
const AbilitiesContext = createContext<SlackContextType | null>(null);

export default AbilitiesContext;
