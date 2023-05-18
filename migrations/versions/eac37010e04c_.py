"""empty message

Revision ID: eac37010e04c
Revises: 
Create Date: 2023-05-17 21:51:20.311448

"""
from alembic import op
import sqlalchemy as sa


# revision identifiers, used by Alembic.
revision = 'eac37010e04c'
down_revision = None
branch_labels = None
depends_on = None


def upgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.create_table('user',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('artist_name', sa.String(length=80), nullable=True),
    sa.Column('username', sa.String(length=50), nullable=False),
    sa.Column('email', sa.String(length=120), nullable=False),
    sa.Column('password', sa.String(length=240), nullable=False),
    sa.Column('is_active', sa.Boolean(), nullable=False),
    sa.Column('role', sa.Enum('musicians', 'manager', 'other', name='role'), nullable=False),
    sa.PrimaryKeyConstraint('id'),
    sa.UniqueConstraint('email'),
    sa.UniqueConstraint('username')
    )
    op.create_table('project',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('version', sa.Integer(), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('version_date', sa.String(length=50), nullable=False),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('song',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('title', sa.String(length=100), nullable=False),
    sa.Column('description', sa.String(length=500), nullable=False),
    sa.Column('gender', sa.String(length=80), nullable=False),
    sa.Column('artist', sa.String(length=50), nullable=False),
    sa.Column('version_date', sa.String(length=50), nullable=False),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.Column('project_id', sa.Integer(), nullable=True),
    sa.Column('song_url', sa.String(length=120), nullable=False),
    sa.Column('cover_url', sa.String(length=240), nullable=False),
    sa.ForeignKeyConstraint(['project_id'], ['project.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    op.create_table('comment',
    sa.Column('id', sa.Integer(), nullable=False),
    sa.Column('content', sa.String(length=240), nullable=False),
    sa.Column('start_date', sa.String(length=50), nullable=False),
    sa.Column('song_id', sa.Integer(), nullable=True),
    sa.Column('user_id', sa.Integer(), nullable=True),
    sa.ForeignKeyConstraint(['song_id'], ['song.id'], ),
    sa.ForeignKeyConstraint(['user_id'], ['user.id'], ),
    sa.PrimaryKeyConstraint('id')
    )
    # ### end Alembic commands ###


def downgrade():
    # ### commands auto generated by Alembic - please adjust! ###
    op.drop_table('comment')
    op.drop_table('song')
    op.drop_table('project')
    op.drop_table('user')
    # ### end Alembic commands ###
