import type { OGElement } from "../../lib/types";
import { useOg } from "../OgEditor";
import { Input } from "../forms/Input";

interface NameSectionProps {
    selectedElement: OGElement
}

export function NameSection({ selectedElement }: NameSectionProps) {
    const { updateElement } = useOg()

    return (
        <>
            <p className="text-xs text-gray-600">Naming</p>
            <div className="grid grid-cols-1 gap-2">
                <Input onChange={value => {
                    updateElement({
                        ...selectedElement,
                        name: value,
                    });
                }} type="text" value={selectedElement.name}>
                    Name
                </Input>
            </div>
        </>
    )
}