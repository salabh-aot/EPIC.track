"""drop column is_deleted

Revision ID: e59e3031b22e
Revises: f1317670be73
Create Date: 2022-07-29 16:27:05.171128

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'e59e3031b22e'
down_revision = 'f1317670be73'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_column('engagements', 'is_deleted')
    op.drop_column('events', 'is_deleted')
    op.drop_column('indigenous_works', 'is_deleted')
    op.drop_column('inspection_attachments', 'is_deleted')
    op.drop_column('inspection_attendees', 'is_deleted')
    op.drop_column('inspection_details', 'is_deleted')
    op.drop_column('inspections', 'is_deleted')
    op.drop_column('issues', 'is_deleted')
    op.drop_column('proponents', 'is_deleted')
    op.drop_column('staff_work_roles', 'is_deleted')
    op.drop_column('staffs', 'is_deleted')
    op.drop_column('work_phases', 'is_deleted')
    op.drop_column('works', 'is_deleted')
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.add_column('works', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('work_phases', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('staffs', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('staff_work_roles', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('proponents', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('issues', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('inspections', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('inspection_details', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('inspection_attendees', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('inspection_attachments', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('indigenous_works', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('events', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    op.add_column('engagements', sa.Column('is_deleted', sa.BOOLEAN(), autoincrement=False, nullable=True))
    # ### end Alembic commands ###
