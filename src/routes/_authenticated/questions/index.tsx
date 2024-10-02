import { createFileRoute } from '@tanstack/react-router'

import QuestionListPage from '@/components/pages/questions'

export const Route = createFileRoute('/_authenticated/questions/')({
  component: () => <QuestionListPage />,
})
