import { makeNotification } from '@test/factories/notification-factory';
import { InMemoryNotificationRepository } from '@test/repositories/in-memory-notifications-repository';
import { CountRecipientNotification } from './count-recipient-notification';
import { GetRecipientNotifications } from './get-recipient-notifications';

describe('Get recipient notification', () => {
  it('should be able to count recipient notifications', async () => {
    const notificationsRepository = new InMemoryNotificationRepository();
    const getRecipientNotification = new GetRecipientNotifications(
      notificationsRepository,
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient 1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient 1' }),
    );

    await notificationsRepository.create(
      makeNotification({ recipientId: 'recipient 2' }),
    );

    const { notifications } = await getRecipientNotification.execute({
      recipientId: 'recipient 1',
    });

    expect(notifications).toHaveLength(2);
    expect(notifications).toEqual(
      expect.arrayContaining([
        expect.objectContaining({ recipientId: 'recipient 1' }),
        expect.objectContaining({ recipientId: 'recipient 1' }),
      ]),
    );
  });
});
