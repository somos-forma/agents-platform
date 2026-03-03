import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import { Button } from "./ui/button";
import { Checkbox } from "./ui/checkbox";
import { Input } from "./ui/input";

type Option = {
  value: string;
  label: string;
};

interface DualListBoxProps {
  options: Option[];
  values: Option[];
  onChange: (val: Option[]) => void;
  label: string;
  placeholderSearch?: string;
}

export function DualListBox({
  options,
  values,
  onChange,
  label,
  placeholderSearch = "Buscar...",
}: DualListBoxProps) {
  const [searchLeft, setSearchLeft] = useState("");
  const [searchRight, setSearchRight] = useState("");

  const [pickedLeft, setPickedLeft] = useState<Option[]>([]);
  const [pickedRight, setPickedRight] = useState<Option[]>([]);

  const handlePickLeft = (value: boolean, option: Option) => {
    setPickedLeft(
      value
        ? [...pickedLeft, option]
        : pickedLeft.filter((v) => v.value !== option.value)
    );
  };

  const handlePickRight = (value: boolean, option: Option) => {
    setPickedRight(
      value
        ? [...pickedRight, option]
        : pickedRight.filter((v) => v.value !== option.value)
    );
  };

  const moveRight = () => {
    onChange([...values, ...pickedLeft]);
  };

  const moveLeft = () => {
    onChange(
      values.filter(
        (value) => !pickedRight.map((v) => v.value).includes(value.value)
      )
    );
  };

  const available = options.filter(
    (option) => !values?.some((item) => item.value === option.value)
  );
  const selected = options.filter((option) =>
    values?.some((item) => item.value === option.value)
  );

  const availableFiltered = available.filter((option) =>
    option.label.toLowerCase().includes(searchLeft.toLowerCase())
  );
  const selectedFiltered = selected.filter((option) =>
    option.label.toLowerCase().includes(searchRight.toLowerCase())
  );
  return (
    <div className="flex gap-6 justify-between">
      {/* Lista izquierda */}
      <Card className="flex-1 shadow-none p-0 bg-transparent border-0 gap-2 ">
        <p className="font-medium"> {label} Disponibles</p>
        <CardContent className="p-0 bg-card space-y-2">
          <Input
            placeholder={placeholderSearch}
            value={searchLeft}
            onChange={(e) => setSearchLeft(e.target.value)}
          />
          <div className="h-48 overflow-auto border rounded-md p-2 space-y-1">
            {availableFiltered.map((option) => (
              <div key={option.value}>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    // checked={pickedLeft.includes(option.value)}
                    onCheckedChange={(value: boolean) =>
                      handlePickLeft(value, option)
                    }
                  />
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Botones mover */}
      <div className="flex flex-col justify-center gap-2">
        <Button
          type="button"
          onClick={() => {
            moveRight();
            setPickedLeft([]);
          }}
          disabled={pickedLeft.length === 0}
        >
          →
        </Button>
        <Button
          type="button"
          onClick={() => {
            moveLeft();
            setPickedRight([]);
          }}
          disabled={pickedRight.length === 0}
        >
          ←
        </Button>
      </div>

      {/* Lista derecha */}
      <Card className="flex-1 shadow-none p-0 border-0 gap-2 bg-transparent ">
        <p className="font-medium">{label} Asignados</p>
        <CardContent className="p-0 bg-card space-y-2">
          <Input
            placeholder={placeholderSearch}
            value={searchRight}
            onChange={(e) => setSearchRight(e.target.value)}
          />
          <div className="h-48 overflow-auto border rounded-md p-2 space-y-1">
            {selectedFiltered.map((option) => (
              <div key={option.value}>
                <label className="flex items-center gap-2 text-sm">
                  <Checkbox
                    // checked={pickedRight.includes(option.value)}
                    onCheckedChange={(value: boolean) =>
                      handlePickRight(value, option)
                    }
                  />
                  {option.label}
                </label>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
