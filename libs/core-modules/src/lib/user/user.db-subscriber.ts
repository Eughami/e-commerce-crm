import { User } from '@shopping/entities';
import { genSaltSync, hashSync } from 'bcrypt';
import { Connection, EntitySubscriberInterface, EventSubscriber, InsertEvent, UpdateEvent } from 'typeorm';

@EventSubscriber()
export class UserSubscriber implements EntitySubscriberInterface<User> {
  constructor(connection: Connection) {
    connection.subscribers.push(this);
  }

  listenTo() {
    return User;
  }

  beforeUpdate(event: UpdateEvent<User>): void {
    if (event?.entity?.password && event?.entity?.password !== event?.databaseEntity?.password) {
      this.hashPassword(event.entity as User);
      event.entity.lastPasswordChange = new Date();
      event.entity.accessToken = null;
    }
  }

  beforeInsert(event: InsertEvent<User>) {
    this.hashPassword(event.entity);
  }

  private hashPassword(user: User): void {
    const salt = genSaltSync();
    user.password = hashSync(user.password, salt);
    user.passwordSalt = salt;
    user.passwordCreatedAt = new Date();
  }
}
