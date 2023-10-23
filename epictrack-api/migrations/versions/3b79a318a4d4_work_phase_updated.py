"""work_phase updated

Revision ID: 3b79a318a4d4
Revises: 6f3b95392d4e
Create Date: 2023-09-16 23:28:39.245095

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = '3b79a318a4d4'
down_revision = '6f3b95392d4e'
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('work_phases', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number_of_days', sa.Integer(), nullable=True))
        batch_op.add_column(sa.Column('is_completed', sa.Boolean(), nullable=True))

    with op.batch_alter_table('work_phases_history', schema=None) as batch_op:
        batch_op.add_column(sa.Column('number_of_days', sa.Integer(), autoincrement=False, nullable=True))
        batch_op.add_column(sa.Column('is_completed', sa.Boolean(), autoincrement=False, nullable=True))

    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    with op.batch_alter_table('work_phases_history', schema=None) as batch_op:
        batch_op.drop_column('is_completed')
        batch_op.drop_column('number_of_days')

    with op.batch_alter_table('work_phases', schema=None) as batch_op:
        batch_op.drop_column('is_completed')
        batch_op.drop_column('number_of_days')

    # ### end Alembic commands ###