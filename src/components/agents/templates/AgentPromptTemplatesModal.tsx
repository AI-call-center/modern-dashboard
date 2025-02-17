import TemplateModal from './TemplateModal';
import { agentPromptCategories, Template } from './templateData';

interface AgentPromptTemplatesModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectTemplate: (template: Template) => void;
}

export default function AgentPromptTemplatesModal({
  isOpen,
  onClose,
  onSelectTemplate,
}: AgentPromptTemplatesModalProps) {
  return (
    <TemplateModal
      isOpen={isOpen}
      onClose={onClose}
      title="Browse Agent Prompt Templates"
      categories={agentPromptCategories}
      onSelectTemplate={onSelectTemplate}
    />
  );
}
