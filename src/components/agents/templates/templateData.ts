export type Template = {
  id: string;
  content: string;
  category: string;
  useCase: string;
};

export type Category = {
  id: string;
  name: string;
  useCases: UseCase[];
};

export type UseCase = {
  id: string;
  name: string;
  templates: Template[];
};

export const categories: Category[] = [
  {
    id: "inbound",
    name: "Inbound Calls",
    useCases: [
      {
        id: "customer-support",
        name: "Customer Support",
        templates: [
          {
            id: "cs-1",
            content: "Hello! How can I assist you today?",
            category: "inbound",
            useCase: "customer-support"
          },
          {
            id: "cs-2",
            content: "Hi there! What can I help you with?",
            category: "inbound",
            useCase: "customer-support"
          },
          {
            id: "cs-3",
            content: "Welcome! How may I assist you?",
            category: "inbound",
            useCase: "customer-support"
          }
        ]
      },
      {
        id: "order-inquiries",
        name: "Order Inquiries",
        templates: [
          {
            id: "oi-1",
            content: "Hi! Do you have any questions about your order?",
            category: "inbound",
            useCase: "order-inquiries"
          },
          {
            id: "oi-2",
            content: "Hello! How can I help with your purchase?",
            category: "inbound",
            useCase: "order-inquiries"
          },
          {
            id: "oi-3",
            content: "Welcome! Let me assist you with your order.",
            category: "inbound",
            useCase: "order-inquiries"
          }
        ]
      },
      {
        id: "technical-support",
        name: "Technical Support",
        templates: [
          {
            id: "ts-1",
            content: "Hi! How can I help with your technical issue?",
            category: "inbound",
            useCase: "technical-support"
          },
          {
            id: "ts-2",
            content: "Hello! What technical problem are you facing?",
            category: "inbound",
            useCase: "technical-support"
          },
          {
            id: "ts-3",
            content: "Welcome! Let's resolve your technical issue.",
            category: "inbound",
            useCase: "technical-support"
          }
        ]
      }
    ]
  },
  {
    id: "outbound",
    name: "Outbound Calls",
    useCases: [
      {
        id: "appointment-reminders",
        name: "Appointment Reminders",
        templates: [
          {
            id: "ar-1",
            content: "Hi! This is a reminder about your upcoming appointment.",
            category: "outbound",
            useCase: "appointment-reminders"
          },
          {
            id: "ar-2",
            content: "Hello! Don't forget your appointment tomorrow.",
            category: "outbound",
            useCase: "appointment-reminders"
          },
          {
            id: "ar-3",
            content: "Welcome! Just a quick reminder about your booking.",
            category: "outbound",
            useCase: "appointment-reminders"
          }
        ]
      },
      {
        id: "sales-outreach",
        name: "Sales Outreach",
        templates: [
          {
            id: "so-1",
            content: "Hi! I'd like to tell you about our latest offer.",
            category: "outbound",
            useCase: "sales-outreach"
          },
          {
            id: "so-2",
            content: "Hello! We have something special for you.",
            category: "outbound",
            useCase: "sales-outreach"
          },
          {
            id: "so-3",
            content: "Welcome! Let me share an exciting opportunity.",
            category: "outbound",
            useCase: "sales-outreach"
          }
        ]
      },
      {
        id: "feedback-collection",
        name: "Feedback Collection",
        templates: [
          {
            id: "fc-1",
            content: "Hi! We'd love to hear your feedback.",
            category: "outbound",
            useCase: "feedback-collection"
          },
          {
            id: "fc-2",
            content: "Hello! Can you spare a moment to share your thoughts?",
            category: "outbound",
            useCase: "feedback-collection"
          },
          {
            id: "fc-3",
            content: "Welcome! Your feedback is important to us.",
            category: "outbound",
            useCase: "feedback-collection"
          }
        ]
      }
    ]
  }
];

export const agentPromptCategories: Category[] = [
  {
    id: "inbound",
    name: "Inbound Calls",
    useCases: [
      {
        id: "customer-support",
        name: "Customer Support",
        templates: [
          {
            id: "cs-prompt-1",
            content: "You are a helpful assistant that resolves customer issues quickly and professionally.",
            category: "inbound",
            useCase: "customer-support"
          },
          {
            id: "cs-prompt-2",
            content: "Your goal is to provide excellent customer service and ensure customer satisfaction.",
            category: "inbound",
            useCase: "customer-support"
          },
          {
            id: "cs-prompt-3",
            content: "You are a friendly and knowledgeable support agent ready to assist with any questions.",
            category: "inbound",
            useCase: "customer-support"
          }
        ]
      },
      // Similar structure for other inbound use cases...
    ]
  },
  // Similar structure for outbound category...
];
