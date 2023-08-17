import { Result } from "@/pages/show/[id]/sheet/[sheetId]";
import { Dialog } from "@headlessui/react";

interface ResultsModalProps {
    isOpen: boolean
    data: Result[]
    onClose: () => void
}

export default function ResultsModal({isOpen, data, onClose}: ResultsModalProps) {
    return(
        <Dialog open={isOpen} onClose={onClose}>
            <Dialog.Panel>
                <Dialog.Title>Información</Dialog.Title>
            </Dialog.Panel>
        </Dialog>
    )
}