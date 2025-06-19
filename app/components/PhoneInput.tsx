"use client";

import React, { useState, useRef, useEffect } from "react";
import {
  CountryCode,
  getCountries,
  getCountryCallingCode,
  parsePhoneNumberFromString,
} from "libphonenumber-js/max";
import { Input } from "@/components/ui/input";
import { country_list } from "@/lib/mock-data/country_data";
import { Check } from "lucide-react";
import Image from "next/image";

interface PhoneInputProps {
  defaultCountry?: CountryCode;
  defaultNumber?: string;

  // For react-hook-form support
  value?: string;
  onChange?: (value: string) => void;

  // Optional controlled country/number behavior
  country?: CountryCode;
  number?: string;

  // Callbacks for custom behavior
  onCountryChange?: (country: CountryCode) => void;
  onNumberChange?: (number: string, isValid: boolean) => void;

  onKeyDown?: (e: any) => void;
}

export default function PhoneInput({
  defaultCountry = "PH",
  defaultNumber = "",
  value,
  onChange,
  onKeyDown,
  country: controlledCountry,
  number: controlledNumber,
  onCountryChange,
  onNumberChange,
}: PhoneInputProps) {
  const [country, setCountry] = useState<CountryCode>(controlledCountry ?? defaultCountry);
  const [number, setNumber] = useState(controlledNumber ?? defaultNumber);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const validCountryCodes = new Set(getCountries());

  // Sync props with state if controlled
  useEffect(() => {
    if (controlledCountry) setCountry(controlledCountry);
  }, [controlledCountry]);

  useEffect(() => {
    if (controlledNumber !== undefined) setNumber(controlledNumber);
  }, [controlledNumber]);

  useEffect(() => {
    if (value !== undefined) setNumber(value);
  }, [value]);

  const fullNumber = `+${getCountryCallingCode(country)}${number}`;
  const parsed = parsePhoneNumberFromString(fullNumber);
  const isValid = parsed?.isValid() ?? false;

  // Notify custom handler
  useEffect(() => {
    if (onNumberChange) onNumberChange(number, isValid);
  }, [number, country]);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setDropdownOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const selectedCountry = country_list.find((c) => c.code === country);

  function handleCountrySelect(newCountry: CountryCode) {
    if (onCountryChange) onCountryChange(newCountry);
    else setCountry(newCountry);
    setDropdownOpen(false);
  }

  function handleNumberInputChange(newNumber: string) {
    const numericValue = newNumber.replace(/\D/g, "");

    // internal state
    setNumber(numericValue);

    // react-hook-form-compatible onChange
    if (onChange) onChange(numericValue);

    // your custom logic will be triggered via useEffect
  }

  return (
    <div className="flex flex-col gap-2 w-full">
      <div className="flex gap-2 relative" ref={dropdownRef}>
        {/* Country selector dropdown */}
        <button
          type="button"
          onClick={() => setDropdownOpen((open) => !open)}
          className="flex items-center gap-2 px-2 border rounded-md bg-white h-10 min-w-[120px]"
          aria-haspopup="listbox"
          aria-expanded={dropdownOpen}
        >
          {selectedCountry ? (
            <>
              <Image
                src={selectedCountry.image}
                alt={selectedCountry.code}
                className="w-6 h-4 object-contain"
                width={400}
                height={400}
              />
              <span>+{getCountryCallingCode(selectedCountry.code as CountryCode)}</span>
            </>
          ) : (
            <span>Select country</span>
          )}
          <svg
            className="ml-auto h-4 w-4"
            xmlns="http://www.w3.org/3000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        {dropdownOpen && (
          <div
            className="absolute z-10 mt-12 max-h-48 w-44 overflow-auto rounded border bg-white shadow-lg"
            role="listbox"
          >
            {country_list
              .filter((c) => validCountryCodes.has(c.code as CountryCode))
              .map((c) => (
                <div
                  key={c.code}
                  role="option"
                  onClick={() => handleCountrySelect(c.code as CountryCode)}
                  className="flex cursor-pointer items-center gap-2 p-2 hover:bg-gray-100"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" || e.key === " ") {
                      e.preventDefault();
                      handleCountrySelect(c.code as CountryCode);
                    }
                  }}
                >
                  <img
                    src={c.image}
                    alt={c.code}
                    className="w-6 h-4 object-contain"
                  />
                  <p className="text-[12px]">{c.name}</p>
                </div>
              ))}
          </div>
        )}

        {/* Phone number input */}
        <div className="flex gap-2 items-center w-full">
          <Input
            className="h-10 flex-1 w-full"
            type="tel"
            placeholder="Enter phone"
            value={number}
            onChange={(e) => handleNumberInputChange(e.target.value)}
            inputMode="tel"
            onKeyDown={onKeyDown}
          />
          <span className="text-sm text-gray-500">
            {isValid && <></>}
          </span>
        </div>
      </div>
    </div>
  );
}
