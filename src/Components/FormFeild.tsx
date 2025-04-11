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
import { Checkbox } from "./ui/checkbox";

interface CustomProps<T extends FieldValues> {
  control: Control<T>;
  label: string;
  name: Path<T>;
  type: string;
  placeholder: string;
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
          <div className="flex items-center gap-4">
            <label htmlFor={props.name} className="checkbox-label">
              {props.label}
            </label>
            <Checkbox
              id={props.name}
              checked={field.value}
              onCheckedChange={field.onChange}
            />
          </div>
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
