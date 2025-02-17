import TemplateModal from './TemplateModal';
import { categories, Template } from './templateData';

interface GreetingTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

export default function GreetingTemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: GreetingTemplatesModalProps) {
  return (
    <TemplateModal
      isOpen={isOpen}
      onClose={onClose}
      title="Browse Greeting Templates"
      categories={categories}
      onSelectTemplate={onSelectTemplate}
    />
  );
}
