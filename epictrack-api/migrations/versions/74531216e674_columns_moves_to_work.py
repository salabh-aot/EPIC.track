"""columns moves to work

Revision ID: 74531216e674
Revises: 73c6150268e5
Create Date: 2023-11-10 10:19:54.637944

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '74531216e674'
down_revision = '73c6150268e5'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('work_issue_updates', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_approved', sa.Boolean(), nullable=False, server_default='false'))
        batch_op.add_column(sa.Column('approved_by', sa.String(length=255), nullable=True))

    with op.batch_alter_table('work_issue_updates_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('is_approved', sa.Boolean(), autoincrement=False, nullable=False, server_default='false'))
        batch_op.add_column(sa.Column('approved_by', sa.String(length=255), autoincrement=False, nullable=True))

    with op.batch_alter_table('work_issues', schema=None) as batch_op:
        batch_op.drop_column('is_approved')
        batch_op.drop_column('approved_by')

    with op.batch_alter_table('work_issues_history', schema=None) as batch_op:
        batch_op.drop_column('is_approved')
        batch_op.drop_column('approved_by')

    with op.batch_alter_table('work_statuses', schema=None) as batch_op:
        batch_op.drop_column('notes')

    with op.batch_alter_table('work_statuses_history', schema=None) as batch_op:
        batch_op.alter_column('posted_date',
               existing_type=sa.DATE(),
               type_=sa.DateTime(timezone=True),
               existing_nullable=False,
               autoincrement=False)
        batch_op.drop_column('notes')

    with op.batch_alter_table('works', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status_notes', sa.Text(), nullable=True))
        batch_op.add_column(sa.Column('issue_notes', sa.Text(), nullable=True))

    with op.batch_alter_table('works_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('status_notes', sa.Text(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('issue_notes', sa.Text(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('works_history', schema=None) as batch_op:
        batch_op.drop_column('issue_notes')
        batch_op.drop_column('status_notes')

    with op.batch_alter_table('works', schema=None) as batch_op:
        batch_op.drop_column('issue_notes')
        batch_op.drop_column('status_notes')

    with op.batch_alter_table('work_statuses_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('notes', sa.TEXT(), autoincrement=False, nullable=True))
        batch_op.alter_column('posted_date',
               existing_type=sa.DateTime(timezone=True),
               type_=sa.DATE(),
               existing_nullable=False,
               autoincrement=False)

    with op.batch_alter_table('work_statuses', schema=None) as batch_op:
        batch_op.add_column(sa.Column('notes', sa.TEXT(), autoincrement=False, nullable=True))

    with op.batch_alter_table('work_issues_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('approved_by', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('is_approved', sa.BOOLEAN(), autoincrement=False, nullable=False, server_default='false'))

    with op.batch_alter_table('work_issues', schema=None) as batch_op:
        batch_op.add_column(sa.Column('approved_by', sa.VARCHAR(length=255), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('is_approved', sa.BOOLEAN(), autoincrement=False, nullable=False, server_default='false'))

    with op.batch_alter_table('work_issue_updates_history', schema=None) as batch_op:
        batch_op.drop_column('approved_by')
        batch_op.drop_column('is_approved')

    with op.batch_alter_table('work_issue_updates', schema=None) as batch_op:
        batch_op.drop_column('approved_by')
        batch_op.drop_column('is_approved')

    # ### end Alembic commands ###