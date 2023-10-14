import { QuestionDetails } from '@/domain/forum/enterprise/entities/value-objects/question-details'
import { AttachmentPresenter } from './attachment-presenter'

export class QuestionDetailsPresenter {
  static toHTTP(questionDetails: QuestionDetails) {
    return {
      questionId: questionDetails.questionId.toString(),
      authorId: questionDetails.authorId.toString(),
      author: questionDetails.author.toString(),
      title: questionDetails.title.toString(),
      content: questionDetails.content.toString(),
      slug: questionDetails.slug.value,
      bestAnswerId: questionDetails.bestAnswerId?.toString(),
      attachments: questionDetails.attachments.map(AttachmentPresenter.toHTTP),
      createdAt: questionDetails.createdAt,
      updatedAt: questionDetails.updatedAt,
    }
  }
}
