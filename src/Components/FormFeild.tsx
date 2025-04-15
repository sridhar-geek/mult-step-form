"use client";
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/Components/ui/form";

import { Input } from "@/Components/ui/input";
import { Control } from "react-hook-form";
import { FieldValues, ControllerRenderProps, Path } from "react-hook-form";
import { RadioGroup } from "./ui/radio-group";
import Image from "next/image";
import { CheckBox, Plans } from "@/lib/types";
import { Checkbox } from "./ui/checkbox";
// import { Button } from "./ui/button";
import { Card } from "./ui/card";

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  label?: string;
  name: Path<T>;
  type: string;
  options?: Plans[];
  checkboxOptions?: CheckBox[];
  billingCycle?: string;
  placeholder?: string;
}

const RenderInput = <T extends FieldValues>({
  field,
  props,
}: {
  field: ControllerRenderProps<T>;
  props: CustomProps<T>;
}) => {
  switch (props.type) {
    case "checkbox":
      return (
        <FormControl>
          <div className="space-y-4">
            {props.checkboxOptions?.map((option) => {
              const isChecked = field.value?.includes(option.name);

              const handleCheckboxChange = (checked: boolean) => {
                const value = field.value || [];
                if (checked) {
                  field.onChange([...value, option.name]);
                } else {
                  field.onChange(
                    value.filter((v: string) => v !== option.name)
                  );
                }
              };

              return (
                <Card
                  key={option.id}
                  className={`w-full flex flex-row items-center justify-between p-4 rounded-lg border text-left transition-all duration-200 ${
                    isChecked
                      ? "border-blue-600 ring-2 ring-blue-500 bg-blue-50"
                      : "border-muted hover:border-blue-400"
                  }`}
                >
                  <Checkbox
                    checked={isChecked}
                    onCheckedChange={handleCheckboxChange}
                    className="cursor-pointer w-6 h-6"
                  />
                  <div className="ml-4 flex-1">
                    <div className="font-medium">{option.name}</div>
                    <div className="text-sm text-muted-foreground">
                      {option.description}
                    </div>
                  </div>
                  <div className="text-sm font-medium text-blue-600">
                    $
                    {props.billingCycle === "monthly"
                      ? option.monthlyPrice
                      : option.yearlyPrice}
                    /{props.billingCycle === "monthly" ? "mo" : "yr"}
                  </div>
                </Card>
              );
            })}
          </div>
        </FormControl>
      );

    case "radio":
      return (
        <FormControl>
          <RadioGroup
            onValueChange={field.onChange}
            defaultValue={field.value}
            className="flex flex-col gap-4"
          >
            {props.options &&
              props.options.map((option) => {
                const isSelected = field.value === option.value;
                return (
                  <Card
                    key={option.value}
                    onClick={() => field.onChange(option.value)}
                    className={`w-full p-4 rounded-lg border text-left transition-all duration-200 cursor-pointer
                      ${
                        isSelected
                          ? "border-blue-600 ring-2 ring-blue-500 bg-blue-50"
                          : "border-muted hover:border-blue-400"
                      }`}
                  >
                    <div className="flex items-center gap-4">
                      <Image
                        src={option.icon}
                        alt={option.label}
                        width={40}
                        height={40}
                      />
                      <div>
                        <div className="font-medium">{option.label}</div>
                        <div className="text-sm text-muted-foreground">
                          $
                          {props.billingCycle === "monthly"
                            ? option.monthlyPrice
                            : option.yearlyPrice}
                          /{props.billingCycle === "monthly" ? "mo" : "yr"}
                        </div>
                        <p>
                          {props.billingCycle === "yearly"
                            ? "2 months free"
                            : ""}
                        </p>
                      </div>
                    </div>
                  </Card>
                );
              })}
          </RadioGroup>
        </FormControl>
      );
    default:
      return (
        <FormControl>
          <Input
            placeholder={props.placeholder}
            {...field}
            type={props.type}
            onChange={(e) => field.onChange(e.target.value)}
            value={field.value ?? ""}
          />
        </FormControl>
      );
  }
};

const FormFeild = <T extends FieldValues>(props: CustomProps<T>) => {
  const { control, label, name } = props;
  return (
    <FormField
      control={control}
      name={name}
      render={({ field }) => (
        <FormItem>
          <FormLabel className="flex justify-between items-center">
            {label}
            <FormMessage />
          </FormLabel>
          <RenderInput field={field} props={props} />
        </FormItem>
      )}
    />
  );
};

export default FormFeild;
